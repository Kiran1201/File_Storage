import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button } from '@mui/material';

const FileUpload = () => {

    const [fileData, setFileData] = useState({
        name: '',
        type: '',
        data: null,
    });

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('name', fileData.name);
            formData.append('type', fileData.type);
            formData.append('data', new Blob([fileData.data]), fileData.name); // Wrap data in a Blob

            await axios.post('http://localhost:8080/api/files/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set the correct content type
                },
            });

            // Reset file data
            setFileData({
                name: '',
                type: '',
                data: null,
            });

            // fetchFiles(); // Refresh the file list
        } catch (error) {
            console.error('Error uploading file:', error.response.data); // Log error response for debugging
        }
    };

    return (

        <div className="app-container">
            <Box
                component="div"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                    padding: 2,
                    border: '1px solid #ccc',
                    borderRadius: 2,
                    width: 400,
                    margin: '0 auto',
                    marginTop: 4,

                }}

            >
                <h2>Upload File</h2>
                <TextField
                    label="File Name"
                    variant="outlined"
                    fullWidth
                    value={fileData.name}
                    onChange={(e) => setFileData({ ...fileData, name: e.target.value })}
                />
                <TextField
                    label="File Type"
                    variant="outlined"
                    fullWidth
                    value={fileData.type}
                    onChange={(e) => setFileData({ ...fileData, type: e.target.value })}
                />
                <Button
                    variant="contained"
                    component="label"
                    fullWidth
                >
                    Choose File
                    <input
                        type="file"
                        hidden
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                setFileData({
                                    ...fileData,
                                    name: file.name,
                                    type: file.type,
                                    data: file,
                                });
                            }
                        }}
                    />
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpload}
                    fullWidth
                >
                    Upload
                </Button>
            </Box>
        </div>
    );
};

export default FileUpload;
