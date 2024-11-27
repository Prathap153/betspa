import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from './redux/authSlice';  // Import the logout action
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <AppBar position="fixed" sx={{ top: 0, zIndex: 1100 }}> {/* Ensure it sits above the sidebar */}
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    BET-APP
                </Typography>
                <Container sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button color="inherit" component={Link} to="/home">
                        Home
                    </Button>
                    <Button color="inherit" component={Link} to="/category">
                        Category
                    </Button>
                    <Button color="inherit" component={Link} to="/billgenerate">
                        Bills
                    </Button>
                    <Button color="inherit" component={Link} to="/" onClick={handleLogout}>
                        Logout
                    </Button>
                </Container>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
