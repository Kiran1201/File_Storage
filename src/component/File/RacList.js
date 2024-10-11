// RacList.js
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
    Typography,
    Card,
    CardContent,
    Grid,
} from '@mui/material';

const RacList = () => {
    const [racs, setRacs] = useState([]);
    const [filteredRacs, setFilteredRacs] = useState([]);
    const [racId, setRacId] = useState('');
    const [open, setOpen] = useState(false);
    const [newRacId, setNewRacId] = useState('');

    useEffect(() => {
        fetchRacs();
    }, []);

    const fetchRacs = async () => {
        const response = await axios.get('http://localhost:8080/api/rac');
        setRacs(response.data);
        setFilteredRacs(response.data);
    };

    const handleFilter = (e) => {
        const filter = e.target.value;
        setRacId(filter);
        setFilteredRacs(racs.filter(rac => rac.racId.includes(filter)));
    };

    const handleCreateRac = async () => {
        await axios.post('http://localhost:8080/api/rac', { racId: newRacId });
        setOpen(false);
        fetchRacs();
    };

    const handleDeleteRac = async (id) => {
        await axios.delete(`http://localhost:8080/api/rac/${id}`);
        fetchRacs();
    };

    return (
        <Card variant="outlined" style={{ padding: '16px', margin: '16px' }}>
            <CardContent>
                <Typography variant="h4" gutterBottom>
                    RAC List
                </Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={8}>
                        <TextField
                            label="Filter by Rac ID"
                            value={racId}
                            onChange={handleFilter}
                            fullWidth
                            variant="outlined"
                            style={{ backgroundColor: '#f5f5f5' }} // Highlight field
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                            onClick={() => setOpen(true)}
                            variant="contained"
                            color="primary"
                            style={{ height: '100%' }}
                        >
                            Add New RAC
                        </Button>
                    </Grid>
                </Grid>
                <TableContainer component={Paper} style={{ marginTop: '16px' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Rac ID</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredRacs.map((rac) => (
                                <TableRow
                                    key={rac.racId}
                                    hover // Add hover effect to table rows
                                    style={{ transition: 'background-color 0.3s' }}
                                >
                                    <TableCell style={{ backgroundColor: '#e8f0fe' }}>{rac.racId}</TableCell>
                                    <TableCell>
                                        {/* <Button
                                            onClick={() => handleDeleteRac(rac.racId)}
                                            variant="outlined"
                                            color="error"
                                        >
                                            Delete
                                        </Button> */}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogTitle>Add New RAC</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Rac ID"
                            value={newRacId}
                            onChange={(e) => setNewRacId(e.target.value)}
                            fullWidth
                            variant="outlined"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCreateRac} color="primary">Save</Button>
                        <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
                    </DialogActions>
                </Dialog>
            </CardContent>
        </Card>
    );
};

export default RacList;
