import React from 'react';
import { useSelector } from 'react-redux';
import { AppBar, Toolbar, Typography, Link, Button, Box } from '@mui/material';

export function NavigationBar(props) {
    const username = useSelector((state) => state.user.full_name)

    const titleStyle = {
        fontWeight: 'bolder',
        fontSize: '16px',
        color: 'white',
        fontFamily: 'Montserrat, sans-serif'
    }

    const linkStyle = {
        fontWeight: 'bold',
        color: 'white',
        paddingLeft: '15px'
    }

    const boxStyle = {
        marginLeft: 'auto',
        marginRight: '30px'
    }

    return (
        <div>
            <AppBar 
                position="static"
                sx={{
                    backgroundColor: '#849324'
                }}>
                <Toolbar 
                    sx={{
                        width: '100% !important',
                        height: '40px',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                    variant="dense">
                    <Typography
                        sx={titleStyle}>
                        Since Sliced Bread
                    </Typography>
                    <Link 
                        href="/"
                        underline="none"
                        color="inherit"
                        sx={linkStyle}>
                        Home
                    </Link>
                    <Link 
                        href="/meal"
                        underline="none"
                        color="inherit"
                        sx={linkStyle}>
                        Meals
                    </Link>
                    <Link 
                        href="/addmeal"
                        underline="none"
                        color="inherit"
                        sx={linkStyle}>
                        Add Meal
                    </Link>
                    <Link
                        href="/login"
                        underline="none"
                        color="inherit"
                        sx={linkStyle}>
                        Login
                    </Link>

                    <Box
                        sx={boxStyle}>
                        <Button
                            href='/lists'
                            variant='contained'
                            sx={linkStyle}
                            style={{ display: !props.loggedIn ? 'none' : undefined }}>
                            {username}'s Shopping Lists
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    )
}