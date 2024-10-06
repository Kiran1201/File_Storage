import React, {useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Typography, Container } from '@mui/material';


const ListFile = () => {
    useEffect(() => {
        fetchFiles();

    }, []);

    const [files, setFiles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredFiles, setFilteredFiles] = useState([]);
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


    const downloadFile = async (fileId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/files/${fileId}`, {
                responseType: 'blob', // Important to set the response type to blob
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `downloaded_file.pdf`); // Specify the .pdf extension
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
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

            </Container>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>SI NO</TableCell>
                            <TableCell>ID</TableCell>
                            <TableCell>NAME</TableCell>
                            <TableCell>TYPE</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredFiles.length > 0 ? (
                            filteredFiles.map((file, index) => (
                                <TableRow key={file.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{file.id}</TableCell>
                                    <TableCell>{file.name}</TableCell>
                                    <TableCell>{file.type}</TableCell>
                                    <TableCell>

                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleDelete(file.id)}
                                            style={{ marginLeft: '10px' }}
                                        >
                                            Delete
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => downloadFile(file.id)}
                                            style={{ marginLeft: '10px' }}
                                        >
                                            Download
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} style={{ textAlign: 'center' }}>
                                    No files available
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    );

};

export default ListFile;