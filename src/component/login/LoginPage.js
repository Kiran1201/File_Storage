import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Card, CardContent } from '@mui/material';
import { toast } from 'react-toastify';

const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [governmentId, setGovernmentId] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    // Handle login
    const handleLogin = async () => {
        try {
            await axios.post('http://localhost:8080/api/users/login', {  username, password });
            toast.success('Login successful!');
            onLogin(); // Call the onLogin prop function to trigger the layout display
        } catch (err) {
            toast.error('Invalid login credentials!');
        }
    };

    // Handle registration
    const handleRegister = async () => {
        try {
            await axios.post('http://localhost:8080/api/users/register', { governmentId, username, password });
            toast.success('Registration successful!');
            setIsRegistering(false); // Switch back to login mode
        } catch (err) {
            toast.error('Registration failed. Please try again.');
        }
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '50px' }}>
            <Card>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        {isRegistering ? 'Register' : 'Login'}
                    </Typography>
                    <TextField
                        label="Government ID"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={governmentId}
                        onChange={(e) => setGovernmentId(e.target.value)}
                    />
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {isRegistering ? (
                        <>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleRegister}
                                style={{ marginTop: '20px' }}
                            >
                                Register
                            </Button>
                            <Button
                                variant="text"
                                onClick={() => setIsRegistering(false)}
                                style={{ marginTop: '10px', marginLeft: '10px' }}
                            >
                                Already have an account? Login
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleLogin}
                                style={{ marginTop: '20px' }}
                            >
                                Login
                            </Button>
                            <Button
                                variant="text"
                                onClick={() => setIsRegistering(true)}
                                style={{ marginTop: '10px', marginLeft: '10px' }}
                            >
                                Don't have an account? Register
                            </Button>
                        </>
                    )}
                </CardContent>
            </Card>
        </Container>
    );
};

export default LoginPage;
