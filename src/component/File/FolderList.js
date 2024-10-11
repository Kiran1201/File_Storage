// FolderList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Grid,
    Card,
    CardContent,
    Typography,
} from '@mui/material';

const FolderList = () => {
    const [folders, setFolders] = useState([]);
    const [filteredFolders, setFilteredFolders] = useState([]);
    const [folderName, setFolderName] = useState('');
    const [selectedRacId, setSelectedRacId] = useState('');
    const [racOptions, setRacOptions] = useState([]);
    const [open, setOpen] = useState(false);
    const [newFolderName, setNewFolderName] = useState('');
    const [newRacId, setNewRacId] = useState('');

    useEffect(() => {
        fetchFolders();
        fetchRacOptions();
    }, []);

    const fetchFolders = async () => {
        const response = await axios.get('http://localhost:8080/api/folder');
        setFolders(response.data);
        setFilteredFolders(response.data);
    };

    const fetchRacOptions = async () => {
        const response = await axios.get('http://localhost:8080/api/rac');
        setRacOptions(response.data);
    };

    const handleFolderFilter = () => {
        if (folderName) {
            setFilteredFolders(folders.filter(folder => folder.folderName.includes(folderName)));
        } else {
            setFilteredFolders(folders);
        }
    };

    const handleRacIdFilter = () => {
        if (selectedRacId) {
            setFilteredFolders(folders.filter(folder => folder.rac && folder.rac.racId === selectedRacId));
        } else {
            setFilteredFolders(folders);
        }
    };

    const handleCreateFolder = async () => {
        await axios.post('http://localhost:8080/api/folder', { folderName: newFolderName, rac: { racId: newRacId } });
        setOpen(false);
        fetchFolders();
    };

    const handleDeleteFolder = (id) => {
        console.log("Deleting folder with id:", id);
        if (!id) {
            console.error("Folder ID is undefined");
            return;
        }
        // Continue with the delete logic
    };
    

    return (
        <Card variant="outlined" style={{ padding: '16px', margin: '16px' }}>
            <CardContent>
                <Typography variant="h4" gutterBottom>
                    Folder List
                </Typography>
                <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                    <Grid item xs={8}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={6}>
                                <TextField
                                    label="Filter by Folder Name"
                                    value={folderName}
                                    onChange={(e) => setFolderName(e.target.value)}
                                    fullWidth
                                    variant="outlined"
                                    style={{ backgroundColor: '#f5f5f5' }} // Highlight field
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Filter by Rac ID</InputLabel>
                                    <Select
                                        value={selectedRacId}
                                        onChange={(e) => setSelectedRacId(e.target.value)}
                                        displayEmpty
                                        style={{ backgroundColor: '#f5f5f5' }} // Highlight select field
                                    >
                                        <MenuItem value="">
                                            <em>All</em>
                                        </MenuItem>
                                        {racOptions.map((rac) => (
                                            <MenuItem key={rac.id} value={rac.racId}>
                                                {rac.racId}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4} style={{ textAlign: 'right' }}>
                        <Button onClick={() => setOpen(true)} variant="contained" color="primary">
                            Add New Folder
                        </Button>
                    </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: '16px' }}>
                    <Grid item xs={6}>
                        <Button onClick={handleFolderFilter} variant="contained" color="primary">
                            Filter by Folder Name
                        </Button>
                        <Button onClick={handleRacIdFilter} variant="contained" color="primary" style={{ marginLeft: '8px' }}>
                            Filter by Rac ID
                        </Button>
                    </Grid>
                </Grid>
                <TableContainer component={Paper} style={{ marginTop: '16px' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Folder Name</TableCell>
                                <TableCell>Rac ID</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredFolders.map((folder) => (
                                <TableRow key={folder.id} hover style={{ transition: 'background-color 0.3s' }}>
                                    <TableCell style={{ backgroundColor: '#e8f0fe' }}>{folder.folderName}</TableCell>
                                    <TableCell>{ folder.rac.racId }</TableCell>
                                    <TableCell>
                                        {/* <Button onClick={() => handleDeleteFolder(folder.id)} variant="outlined" color="error">
                                            Delete
                                        </Button> */}
                                    </TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </TableContainer>

                <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogTitle>Add New Folder</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Folder Name"
                            value={newFolderName}
                            onChange={(e) => setNewFolderName(e.target.value)}
                            fullWidth
                            variant="outlined"
                        />
                        <FormControl fullWidth variant="outlined" style={{ marginTop: '16px' }}>
                            <InputLabel>Rac ID</InputLabel>
                            <Select
                                value={newRacId}
                                onChange={(e) => setNewRacId(e.target.value)}
                                style={{ backgroundColor: '#f5f5f5' }} // Highlight select field
                            >
                                {racOptions.map((rac) => (
                                    <MenuItem key={rac.id} value={rac.racId}>
                                        {rac.racId}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCreateFolder} color="primary">Save</Button>
                        <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
                    </DialogActions>
                </Dialog>
            </CardContent>
        </Card>
    );
};

export default FolderList;
