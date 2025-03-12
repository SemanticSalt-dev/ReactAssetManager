import React from "react";
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <nav style={{ backgroundColor:'f0f0f0', padding: '10px' }}>
            <ul style={{ listStyle: 'none', display: 'flex', margin: 0, padding: 0 }}>
                <li style={{ marginRight: '15px' }}>
                    <Link to="/" style={{ textDecoration: 'none', color: '#333' }}>Inventory</Link>
                </li>
                <li style={{ marginRight: '15px' }}>
                    <Link to="/add-item" style={{ textDecoration: 'none', color: '#333' }}>Add Item</Link>
                </li>
                <li>
                    <Link to="/add-category" style={{ textDecoration: 'none', color: '#333' }}>Add Category</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;