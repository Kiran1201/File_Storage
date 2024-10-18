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

    const [racIds, setRacIds] = useState([]);
    const [folderNames, setFolderNames] = useState([]);

    // Fetch RAC IDs
    useEffect(() => {
        const fetchRacIds = async () => {
            try {
                const racResponse = await axios.get('http://localhost:8080/api/rac');
                setRacIds(racResponse.data);
            } catch (error) {
                console.error('Error fetching RAC IDs:', error);
            }
        };

        fetchRacIds();
    }, []);

    // Fetch folder names based on selected RAC ID
    const handleRacIdChange = async (racId) => {
        setFileData({ ...fileData, racId, folderName: '' });  // Reset folderName when RAC changes
        try {
            const folderResponse = await axios.get(`http://localhost:8080/api/folder/rac/${racId}`);
            console.log("Folder API Response: ", folderResponse.data);  // Debugging log
            setFolderNames(folderResponse.data);
        } catch (error) {
            console.error('Error fetching folder names:', error);
            setFolderNames([]);  // Clear folders on error
        }
    };

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('name', fileData.name);
            formData.append('type', fileData.type);
            formData.append('data', new Blob([fileData.data]), fileData.name);
            formData.append('racId', fileData.racId);
            formData.append('folderName', fileData.folderName);

            await axios.post('http://localhost:8080/api/files/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Reset the form after successful upload
            setFileData({
                name: '',
                type: '',
                data: null,
                racId: '',
                folderName: ''
            });
        } catch (error) {
            console.error('Error uploading file:', error.response.data);
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

                {/* File Name Input */}
                <TextField
                    label="File Name"
                    variant="outlined"
                    fullWidth
                    value={fileData.name}
                    onChange={(e) => setFileData({ ...fileData, name: e.target.value })}
                />

                {/* File Type Input */}
                <TextField
                    label="File Type"
                    variant="outlined"
                    fullWidth
                    value={fileData.type}
                    onChange={(e) => setFileData({ ...fileData, type: e.target.value })}
                />

                {/* RAC ID Dropdown */}
                <FormControl fullWidth variant="outlined">
                    <InputLabel id="rac-select-label">RAC ID</InputLabel>
                    <Select
                        labelId="rac-select-label"
                        value={fileData.racId}
                        onChange={(e) => handleRacIdChange(e.target.value)}
                        label="RAC ID"
                    >
                        {racIds.map((rac) => (
                            <MenuItem key={rac.id} value={rac.racId}>
                                {rac.racId}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Folder Name Dropdown */}
                <FormControl fullWidth variant="outlined" disabled={!fileData.racId}>
                    <InputLabel>Folder Name</InputLabel>
                    <Select
                        labelId="folder-select-label"
                        value={fileData.folderName}
                        onChange={(e) => setFileData({ ...fileData, folderName: e.target.value })}
                        label="Folder Name"
                    >
                        {folderNames.length > 0 ? (
                            folderNames.map((folder) => (
                                <MenuItem key={folder.id} value={folder.folderName}>
                                    {folder.folderName}
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem disabled>No folders available</MenuItem>
                        )}
                    </Select>
                </FormControl>

                {/* File Input */}
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

                {/* Upload Button */}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpload}
                    fullWidth
                    disabled={!fileData.racId || !fileData.folderName || !fileData.data}
                >
                    Upload
                </Button>
            </Box>
        </div>
    );
};

export default FileUpload;
