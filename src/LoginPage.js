import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Login } from '../src/redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error, loading, token } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(Login({ username: formData.username, password: formData.password }));
    };

    useEffect(() => {
        if (token) {
            navigate('/home');
        }
    }, [token, navigate]);

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                bgcolor: 'background.default',
            }}
        >
            <Card sx={{ width: 400, padding: 3 }}>
                <CardContent>
                    <Typography variant="h4">Login</Typography>
                    <form onSubmit={handleLogin}>
                        <TextField
                            label="Username"
                            variant="outlined"
                            margin="normal"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            sx={{ width: '80%' }}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            margin="normal"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            sx={{ width: '80%' }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ width: '80%', mt: 2 }}
                            disabled={loading}  // Disable the button when loading
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </Button>
                    </form>
                    {error && (
                        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                            {error}
                        </Typography>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default LoginPage;
