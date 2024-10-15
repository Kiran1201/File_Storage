import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const FileUpload = () => {
    const [fileData, setFileData] = useState({
        name: '',
        type: '',
        data: null,
        racId: '',
        folderName: ''
    });

    const [racIds, setRacIds] = useState([]); // State for RAC IDs
    const [folderNames, setFolderNames] = useState([]); // State for Folder Names

    useEffect(() => {
        // Fetch RAC IDs and Folder Names from your API or hardcoded values
        const fetchDropdownData = async () => {
            try {
                const racResponse = await axios.get('http://localhost:8080/api/racs'); // Update with your API endpoint
                const folderResponse = await axios.get('http://localhost:8080/api/folders'); // Update with your API endpoint
                setRacIds(racResponse.data);
                setFolderNames(folderResponse.data);
            } catch (error) {
                console.error('Error fetching dropdown data:', error);
            }
        };

        fetchDropdownData();
    }, []);

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('name', fileData.name);
            formData.append('type', fileData.type);
            formData.append('data', new Blob([fileData.data]), fileData.name); // Wrap data in a Blob
            formData.append('racId', fileData.racId); // Add RAC ID
            formData.append('folderName', fileData.folderName); // Add Folder Name

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
                racId: '',
                folderName: ''
            });

            // fetchFiles(); // Refresh the file list if needed
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

                <FormControl fullWidth variant="outlined">
                    <InputLabel id="rac-select-label">RAC ID</InputLabel>
                    <Select
                        labelId="rac-select-label"
                        value={fileData.racId}
                        onChange={(e) => setFileData({ ...fileData, racId: e.target.value })}
                        label="RAC ID"
                    >
                        {racIds.map((rac) => (
                            <MenuItem key={rac.id} value={rac.id}>
                                {rac.name} {/* Adjust according to your rac object structure */}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth variant="outlined">
                    <InputLabel id="folder-select-label">Folder Name</InputLabel>
                    <Select
                        labelId="folder-select-label"
                        value={fileData.folderName}
                        onChange={(e) => setFileData({ ...fileData, folderName: e.target.value })}
                        label="Folder Name"
                    >
                        {folderNames.map((folder) => (
                            <MenuItem key={folder.id} value={folder.name}>
                                {folder.name} {/* Adjust according to your folder object structure */}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

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
