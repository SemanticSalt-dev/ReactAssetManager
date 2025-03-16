import React from "react";
import { Link } from 'react-router-dom';
import './styles/NavBar.css';

function NavBar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Inventory</Link>
                </li>
                <li>
                    <Link to="/add-item">Add Item</Link>
                </li>
                <li>
                    <Link to="/add-category">Add Category</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;