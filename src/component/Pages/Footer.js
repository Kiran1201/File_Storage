import React from 'react';
import { Paper, Typography } from '@mui/material';

const Footer = () => (
    <Paper 
        elevation={3} 
        style={{ 
            padding: '20px', 
            marginTop: '20px', 
            backgroundColor: 'lightblue',  // Set background color to light blue
            textAlign: 'center',           // Center the content
        }}
    >
        <Typography 
            variant="body1" 
            style={{ 
                fontWeight: 'bold',          // Highlight the text
            }}
        >
            @Government Doc-Management - Application
        </Typography>
    </Paper>
);

export default Footer;
