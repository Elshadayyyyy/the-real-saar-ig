import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={{ backgroundColor: '#343a40', padding: '1rem' }}>
            <ul style={{ listStyleType: 'none', display: 'flex', gap: '1rem' }}>
                <li><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link></li>
                <li><Link to="/posts" style={{ color: 'white', textDecoration: 'none' }}>Posts</Link></li>
                <li><Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>Profile</Link></li>
                
            </ul>
        </nav>
    );
};

export default Navbar;
