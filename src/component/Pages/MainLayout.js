import React from 'react';
import { Box, Grid } from '@mui/material';
import Sidebar from './Sidebar';
import BodyContent from './BodyContent';

const MainLayout = () => {
    return (
        <Box sx={{ flexGrow: 1, paddingTop: '20px', color: '#87CEEB' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={3}>
                    <Sidebar />
                </Grid>
                <Grid item xs={12} sm={9}>
                    <BodyContent />
                </Grid>
            </Grid>
        </Box>
    );
};

export default MainLayout;
