import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearValues } from '../../features/user/userSlice';
import history from '../../utils/history'
import { AppBar, Toolbar, Typography, Link, Box, Menu, MenuItem, IconButton, Avatar, Divider } from '@mui/material';

export function NavigationBar(props) {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const dispatch = useDispatch()
    const open = Boolean(anchorEl)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const shoppingListClick = (event) => {
        history.push('/lists')
    }

    const logoutClick = (event) => {
        // Clear values from react store
        dispatch(clearValues())
        // Redirect to logged out page
        history.push('/loggedout')
    }

    const username = useSelector((state) => state.user.first_name)

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
                    {
                        props.loggedIn && (
                            <Link 
                                href="/meal"
                                underline="none"
                                color="inherit"
                                sx={linkStyle}>
                                Meals
                            </Link>
                        )
                    }
                    {
                        props.loggedIn && (
                            <Link 
                                href="/addmeal"
                                underline="none"
                                color="inherit"
                                sx={linkStyle}>
                                Add Meal
                            </Link>
                        )
                    }
                    {
                        !props.loggedIn && (
                            <Link
                                href="/login"
                                underline="none"
                                color="inherit"
                                sx={linkStyle}>
                                Login
                            </Link>
                        )
                    }
                    {
                        props.loggedIn && (
                            <Box
                                sx={boxStyle}>

                                <IconButton
                                    onClick={handleClick}>
                                    <Avatar
                                        sx={{ width: 32, height: 32 }}>
                                        {username.substring(0, 1)}
                                    </Avatar>
                                </IconButton>

                                <Menu
                                    anchorEl={anchorEl}
                                    id="account-menu"
                                    open={open}
                                    onClose={handleClose}
                                    onClick={handleClose}
                                    PaperProps={{
                                        elevation: 0,
                                        sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            mt: 1.5,
                                            '& .MuiAvatar-root': {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 1,
                                            },
                                            '&:before': {
                                                content: '""',
                                                display: 'block',
                                                position: 'absolute',
                                                top: 0,
                                                right: 14,
                                                width: 10,
                                                height: 10,
                                                bgcolor: 'background.paper',
                                                transform: 'translateY(-50%) rotate(45deg)',
                                                zIndex: 0,
                                            },
                                        },
                                    }}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                                    <MenuItem
                                        onClick={shoppingListClick}>
                                        View Shopping Lists
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem
                                        onClick={logoutClick}>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </Box>
                        )
                    }
                </Toolbar>
            </AppBar>
        </div>
    )
}