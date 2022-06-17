import React from 'react';
import './navbar.css'
import { AppBar, Toolbar, Typography, Link } from '@mui/material';

export class NavigationBar extends React.Component {
    render() {
        return this.renderNavBar()
    }

    renderNavBar() {
        return (
            <AppBar position="static">
                <Toolbar className='nav-bar' variant="dense">
                    <Typography
                        className='nav-bar-title'>
                        Easy Shop
                    </Typography>
                    <Link 
                        href="/"
                        underline="none"
                        color="inherit"
                        className='nav-bar-link'>
                        Home
                    </Link>
                    <Link 
                        href="/meal"
                        underline="none"
                        color="inherit"
                        className='nav-bar-link'>
                        Meals
                    </Link>
                    <Link 
                        href="/addmeal"
                        underline="none"
                        color="inherit"
                        className='nav-bar-link'>
                        Add Meal
                    </Link>
                </Toolbar>
            </AppBar>
        )
    }
}