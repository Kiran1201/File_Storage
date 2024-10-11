import React from 'react';
import { Box, Grid } from '@mui/material';
import Sidebar from './Sidebar';
import AppRouter from '../../AppRouter';

const MainLayout = () => {
    return (
        <Box sx={{ flexGrow: 1 }} style={{ paddingTop: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Sidebar /> {/* Sidebar with navigation links */}
                </Grid>
                <Grid item xs={9}>
                    <AppRouter /> {/* Body content changes based on the route */}
                </Grid>
            </Grid>
        </Box>
    );
};

export default MainLayout;
