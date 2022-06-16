import { Link } from 'react-router-dom';
import React from 'react';
import './navbar.css'

export class NavigationBar extends React.Component {
    render() {
        return (
            <div className='nav-bar'>
                <p className='nav-bar-title'>Easy Shop</p>
                <Link to="/" className='nav-bar-link'>Home</Link>
                <p className='nav-bar-link'>Meals</p>
                <Link to="/addmeal" className='nav-bar-link'>Add Meal</Link>
            </div>
        )
    }
}