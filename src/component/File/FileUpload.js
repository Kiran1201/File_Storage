import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const FileUpload = () => {
    const [fileData, setFileData] = useState({
        name: '',
        type: '',
        data: null,
        racId: '',   // Holds the selected RAC ID
        folderName: ''  // Holds the selected folder name
    });

    const [racIds, setRacIds] = useState([]);  // State to store RAC IDs fetched from the API
    const [folderNames, setFolderNames] = useState([]);  // State to store folder names fetched from the API

    // Fetch RAC IDs and Folder Names from the backend when the component mounts
    useEffect(() => {
        const fetchDropdownData = async () => {
            try {
                // Fetch RAC IDs
                const racResponse = await axios.get('http://localhost:8080/api/rac');  // Update with correct API endpoint
                setRacIds(racResponse.data);

                // Fetch Folder Names
                const folderResponse = await axios.get('http://localhost:8080/api/folder');  // Update with correct API endpoint
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
            formData.append('name', fileData.name);  // File name
            formData.append('type', fileData.type);  // File type
            formData.append('data', new Blob([fileData.data]), fileData.name);  // File data as Blob
            formData.append('racId', fileData.racId);  // Selected RAC ID
            formData.append('folderName', fileData.folderName);  // Selected Folder Name

            // Send file upload request
            await axios.post('http://localhost:8080/api/files/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',  // Ensure the correct content type for file uploads
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
            console.error('Error uploading file:', error.response.data);  // Log any errors that occur
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
                        onChange={(e) => setFileData({ ...fileData, racId: e.target.value })}
                        label="RAC ID"
                    >
                        {racIds.map((rac) => (
                            <MenuItem key={rac.id} value={rac.racId}>
                                {rac.racId}  {/* Assuming racId is the display value */}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Folder Name Dropdown */}
                <FormControl fullWidth variant="outlined">
                    <InputLabel id="folder-select-label">Folder Name</InputLabel>
                    <Select
                        labelId="folder-select-label"
                        value={fileData.folderName}
                        onChange={(e) => setFileData({ ...fileData, folderName: e.target.value })}
                        label="Folder Name"
                    >
                        {folderNames.map((folder) => (
                            <MenuItem key={folder.id} value={folder.folderName}>
                                {folder.folderName}  {/* Assuming folderName is the display value */}
                            </MenuItem>
                        ))}
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
                >
                    Upload
                </Button>
            </Box>
        </div>
    );
};

export default FileUpload;
