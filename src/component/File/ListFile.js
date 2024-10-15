import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Button,
    Typography,
    Container,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';

const ListFile = () => {
    useEffect(() => {
        fetchFiles();
    }, []);

    const [files, setFiles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredFiles, setFilteredFiles] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileType, setFileType] = useState(''); // To store the file type

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        // Filter files based on the search term
        const filtered = files.filter(file =>
            file.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredFiles(filtered);
    };

    const fetchFiles = async () => {
        const response = await axios.get('http://localhost:8080/api/files');
        setFiles(response.data);
        setFilteredFiles(response.data);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/files/${id}`);
            fetchFiles(); // Refresh the file list
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    };

    const viewFile = async (fileId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/files/${fileId}`, {
                responseType: 'arraybuffer', // Important for binary data
            });
            const fileContent = new Blob([response.data], { type: 'application/pdf' }); // Specify the PDF MIME type
            const fileUrl = URL.createObjectURL(fileContent); // Create a URL for the blob
            setSelectedFile(fileUrl);
            setFileType('application/pdf'); // Set the file type
            setOpen(true); // Open the modal
        } catch (error) {
            console.error('Error fetching file for viewing:', error);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedFile(null); // Clear the file URL
        setFileType(''); // Reset file type
        URL.revokeObjectURL(selectedFile); // Revoke the URL to avoid memory leaks
    };

    return (
        <div>
            <Container maxWidth="sm" style={{ marginTop: '50px' }}>
                <Typography variant="h3" gutterBottom>
                    Search Files
                </Typography>
                <TextField
                    label="Enter file name"
                    variant="outlined"
                    fullWidth
                    value={searchTerm}
                    onChange={handleSearch} // Use handleSearch for filtering
                    margin="normal"
                />
                <TextField
                    label="Enter racid"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Enter folder name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
            </Container>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ backgroundColor: '#3f51b5', color: 'white' }}>SI NO</TableCell>
                            <TableCell sx={{ backgroundColor: '#3f51b5', color: 'white' }}>ID</TableCell>
                            <TableCell sx={{ backgroundColor: '#3f51b5', color: 'white' }}>RAC ID</TableCell> {/* New RAC ID Column */}
                            <TableCell sx={{ backgroundColor: '#3f51b5', color: 'white' }}>Folder Name</TableCell> {/* New Folder Name Column */}
                            <TableCell sx={{ backgroundColor: '#3f51b5', color: 'white' }}>NAME</TableCell>
                            <TableCell sx={{ backgroundColor: '#3f51b5', color: 'white' }}>TYPE</TableCell>
                            <TableCell sx={{ backgroundColor: '#3f51b5', color: 'white' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredFiles.length > 0 ? (
                            filteredFiles.map((file, index) => (
                                <TableRow key={file.id} sx={{ '&:hover': { backgroundColor: '#e0e0e0' } }}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{file.id}</TableCell>
                                    <TableCell>{file.racId}</TableCell> {/* Populate RAC ID */}
                                    <TableCell>{file.folderName}</TableCell> {/* Populate Folder Name */}
                                    <TableCell>{file.name}</TableCell>
                                    <TableCell>{file.type}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => viewFile(file.id)} // Call viewFile on click
                                            style={{ marginLeft: '10px' }}
                                        >
                                            View
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleDelete(file.id)}
                                            style={{ marginLeft: '10px' }}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} style={{ textAlign: 'center' }}>
                                    No files available
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Modal to view the file */}
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="lg" // Maximum width for larger screens
                PaperProps={{
                    style: {
                        height: '100vh', // Set height to full viewport height
                        width: '100vw', // Set width to full viewport width
                        margin: 0, // Remove default margins
                        borderRadius: 0, // Remove border radius
                    },
                }}
            >
                <DialogTitle style={{ textAlign: 'center' }}>View File</DialogTitle>
                <DialogContent style={{ padding: 0 }}>
                    {selectedFile && (
                        <iframe
                            title="File Viewer"
                            src={selectedFile}
                            style={{ width: '100%', height: 'calc(100vh - 64px)' }} // Full height minus header
                            frameBorder="0"
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ListFile;
