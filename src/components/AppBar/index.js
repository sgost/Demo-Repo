import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { useNavigate } from "react-router-dom";
import { setAppBarShow } from "../../redux/counterSlice";
import { useDispatch } from 'react-redux';

const pages = ['Products', 'Pricing'];
const settings = ['Logout'];

function AppBarCompo() {

    const [userMenu, setUserMenu] = useState(false);
    // Fetching UserData from sessionStorage
    const userData =
        typeof sessionStorage !== "undefined" &&
        JSON.parse(sessionStorage.getItem("userData"));

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Check userLogin
    useEffect(() => {
        if (!userData) {
            logoutFun();
        }
        // eslint-disable-next-line
    }, []);

    // Logout function
    const logoutFun = () => {
        navigate("/");
        dispatch(setAppBarShow({ bool: false }));
        sessionStorage.removeItem("userData");
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <StarOutlineIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        STARWARS
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={() => navigate(`/${page}`)}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Click To Logout">
                            <IconButton onClick={() => setUserMenu(!userMenu)} sx={{ p: 0 }}>
                                <Avatar alt={userData?.fullName} src={userData?.photoUrl} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={userMenu}
                            onClose={() => setUserMenu(false)}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={() => logoutFun()}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default AppBarCompo;