import React from 'react';
import { Paper, Typography } from '@mui/material';

const Header = () => (
    <Paper elevation={3}
        style={{
            padding: '20px',
            backgroundColor: '#B0E0E6',  // Deep blue color
            // color: '#fff',               // White text color for contrast
            display: 'flex',              // Flexbox for layout
            alignItems: 'center',         // Center items vertically
        }}
    >
        <Typography variant="h5">Doc-Management</Typography>
    </Paper>
);

export default Header;