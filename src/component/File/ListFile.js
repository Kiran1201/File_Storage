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
    Grid,
} from '@mui/material';

const ListFile = () => {
    useEffect(() => {
        fetchFiles();
    }, []);

    const [files, setFiles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [racIdSearchTerm, setRacIdSearchTerm] = useState('');
    const [folderNameSearchTerm, setFolderNameSearchTerm] = useState('');
    const [filteredFiles, setFilteredFiles] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileType, setFileType] = useState('');

    // Fetch files from the server
    const fetchFiles = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/files');
            setFiles(response.data);
            setFilteredFiles(response.data);  // Initialize filtered files with all files
        } catch (error) {
            console.error('Error fetching files:', error);
        }
    };

    // Handle search based on multiple criteria
    const handleSearch = () => {
        // If all search fields are empty, reset the filtered list to the original files list
        if (!searchTerm && !racIdSearchTerm && !folderNameSearchTerm) {
            setFilteredFiles(files);
        } else {
            const filtered = files.filter(file =>
                file.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (!racIdSearchTerm || (file.rac && file.rac.racId.toString() === racIdSearchTerm)) &&
                (!folderNameSearchTerm || (file.folder && file.folder.folderName.toLowerCase().includes(folderNameSearchTerm.toLowerCase())))
            );
            setFilteredFiles(filtered);
        }
    };

    // Clear the search inputs and reset the file list
    const handleClear = () => {
        setSearchTerm('');
        setRacIdSearchTerm('');
        setFolderNameSearchTerm('');
        setFilteredFiles(files); // Reset filteredFiles to the original files list
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
                responseType: 'arraybuffer',
            });
            const fileContent = new Blob([response.data], { type: 'application/pdf' });
            const fileUrl = URL.createObjectURL(fileContent);
            setSelectedFile(fileUrl);
            setFileType('application/pdf');
            setOpen(true);
        } catch (error) {
            console.error('Error fetching file for viewing:', error);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedFile(null);
        setFileType('');
        URL.revokeObjectURL(selectedFile);
    };

    return (
        <div>
            <Container maxWidth="lg" style={{ marginTop: '30px' }}>
                <Typography variant="h4" gutterBottom>
                    File List
                </Typography>

                {/* Combine filter inputs and buttons in the same row */}
                <Grid container spacing={2} alignItems="center" style={{ marginBottom: '20px' }}>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            label="Filter by File Name"
                            variant="outlined"
                            fullWidth
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            label="Filter by RAC ID"
                            variant="outlined"
                            fullWidth
                            value={racIdSearchTerm}
                            onChange={(e) => setRacIdSearchTerm(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            label="Filter by Folder Name"
                            variant="outlined"
                            fullWidth
                            value={folderNameSearchTerm}
                            onChange={(e) => setFolderNameSearchTerm(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSearch}
                            style={{ marginRight: '10px' }}
                        >
                            Filter
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleClear}
                        >
                            Clear
                        </Button>
                    </Grid>
                </Grid>
            </Container>

            <TableContainer
                component={Paper}
                sx={{
                    marginTop: '20px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    width: '95%',
                    overflowX: 'auto'
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ backgroundColor: '#3f51b5', color: 'white', fontWeight: 'bold' }}>SI NO</TableCell>
                            <TableCell sx={{ backgroundColor: '#3f51b5', color: 'white', fontWeight: 'bold' }}>ID</TableCell>
                            <TableCell sx={{ backgroundColor: '#3f51b5', color: 'white', fontWeight: 'bold' }}>RAC ID</TableCell>
                            <TableCell sx={{ backgroundColor: '#3f51b5', color: 'white', fontWeight: 'bold' }}>Folder Name</TableCell>
                            <TableCell sx={{ backgroundColor: '#3f51b5', color: 'white', fontWeight: 'bold' }}>NAME</TableCell>
                            <TableCell sx={{ backgroundColor: '#3f51b5', color: 'white', fontWeight: 'bold' }}>TYPE</TableCell>
                            <TableCell sx={{ backgroundColor: '#3f51b5', color: 'white', fontWeight: 'bold' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredFiles.length > 0 ? (
                            filteredFiles.map((file, index) => (
                                <TableRow key={file.id} sx={{ '&:hover': { backgroundColor: '#e0e0e0' } }}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{file.id}</TableCell>
                                    <TableCell>{file.rac ? file.rac.racId : 'N/A'}</TableCell>
                                    <TableCell>{file.folder ? file.folder.folderName : 'N/A'}</TableCell>
                                    <TableCell sx={{ width: '200px' }}>{file.name}</TableCell>
                                    <TableCell sx={{ width: '100px' }}>{file.type}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => viewFile(file.id)}
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

            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="lg"
                PaperProps={{
                    style: {
                        height: '100vh',
                        width: '100vw',
                        margin: 0,
                        borderRadius: 0,
                    },
                }}
            >
                <DialogTitle>View File</DialogTitle>
                <DialogContent>
                    {selectedFile && (
                        <iframe
                            src={selectedFile}
                            title="File Viewer"
                            style={{ width: '100%', height: '100%' }}
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
