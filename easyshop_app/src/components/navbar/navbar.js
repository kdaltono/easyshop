import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearValues } from '../../features/user/userSlice';
import history from '../../utils/history'
import Logo from '../../res/logo.png'
import { AppBar, Toolbar, Link, Box, Menu, MenuItem, IconButton, Avatar, Divider } from '@mui/material';
import Home from '@mui/icons-material/Home'
import Search from '@mui/icons-material/Search'
import Login from '@mui/icons-material/Login'

export function NavigationBar(props) {
    return (
        <div>
            <AppBar 
                position="static"
                sx={{
                    backgroundColor: 'white'
                }}>
                <Toolbar 
                    sx={{
                        width: '100% !important',
                        height: '60px',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                    variant="dense">
                    <Box
                        component="img"
                        sx={{
                            height: '50px',
                            width: 'auto',
                            mixBlendMode: 'multiply'
                        }}
                        alt="Company Logo"
                        src={Logo}/>
                    <Box
                        /* Center in screen space preferably */
                        sx={{
                            display: 'block',
                            marginLeft: 'auto',
                            marginRight: '40px'
                        }}>
                        {
                            NavButtons(props)
                        }
                    </Box>

                    {
                        props.loggedIn && (
                            UserMenu(props)
                        )
                    }
                </Toolbar>
            </AppBar>
        </div>
    )
}

function NavButtons(props) {
    const iconStyle = {
        fill: 'black',
        paddingRight: '20px',
        paddingLeft: '20px',
        width: '30px',
        height: 'auto'
    }

    return (
        <Box>
            <Link
                href="/"
                underline="none">
                <Home 
                    sx={iconStyle}/>
            </Link>

            {
                props.loggedIn && (
                    <Link
                        href="/meal"
                        underline='none'>
                        <Search
                            sx={iconStyle}/>
                    </Link>
                )

            }

            {
                !props.loggedIn && (
                    <Link
                        href='/login'
                        underline='none'>
                        <Login 
                            sx={iconStyle}/>
                    </Link>
                )
            }
        </Box>
    )
}

function UserMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const dispatch = useDispatch()
    const open = Boolean(anchorEl)
    const username = useSelector((state) => state.user.first_name)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const shoppingListClick = (event) => {
        history.push('/lists')
    }

    const addMealClick = (event) => {
        history.push('/addmeal')
    }

    const logoutClick = (event) => {
        // Clear values from react store
        dispatch(clearValues())
        // Redirect to logged out page
        history.push('/loggedout')
    }

    const boxStyle = {
        marginLeft: '10px',
        marginRight: '30px'
    }

    return (
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
                <MenuItem
                    onClick={addMealClick}>
                    Create a Meal
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