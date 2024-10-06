
import React from 'react';
import { Typography, Card, CardContent } from '@mui/material';
import FileUpload from '../File/FileUpload';

const BodyContent = () => (
    <Card style={{ padding: '20px' }}>
        <CardContent>
            <Typography variant="h6">Main Body Content</Typography>
            <FileUpload />
        </CardContent>
    </Card>
);

export default BodyContent;