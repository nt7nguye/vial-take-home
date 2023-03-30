import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

interface NavbarProps {
    username: string;
    onSignOut: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ username, onSignOut }) => {
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar>
                    <Typography variant="h6">
                        Sin / Cos = Tan
                    </Typography>
                    {username !== "" ? (
                        <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
                        <Typography variant="subtitle1" style={{ marginRight: '16px' }}>
                            Signed in as {username}
                        </Typography>
                        <Button color="inherit" onClick={onSignOut}>
                            Sign Out
                        </Button>
                        </div>
                    ) : (
                        <Button color="inherit" style={{ marginLeft: 'auto' }}>
                            Sign In
                        </Button>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;



