
import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt'; // File list icon
import UploadFileIcon from '@mui/icons-material/UploadFile'; // File upload icon
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <Paper
            elevation={3}
            sx={{
                padding: '18px',
                height: '95%',
                backgroundColor: 'lightblue',
                borderRadius: '10px',
            }}
        >
            <Typography variant="h6" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
                Sidebar
            </Typography>
            <List>
                <ListItem button component={Link} to="/file">
                    <ListItemIcon>
                        <ListAltIcon />
                    </ListItemIcon>
                    <ListItemText primary="FileList" />
                </ListItem>
                <ListItem button component = {Link} to = "/upload">
                    <ListItemIcon>
                        <UploadFileIcon />
                    </ListItemIcon>
                    <ListItemText primary="FileUpload" />
                </ListItem>
            </List>
        </Paper>
    );
};

export default Sidebar;