import React from "react";
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import './styles/NavBar.css';

function NavBar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  className="navbar-icon-button"
                >
                    <MenuIcon />
                </IconButton>            
                <Button color="inherit" component={Link} to="/">
                    Inventory
                </Button>
                <Button color="inherit" component={Link} to="/add-item">
                    Add Item
                </Button>
                <Button color="inherit" component={Link} to="/add-category">
                    Add Category
                </Button>
                <Button color="inherit" component={Link} to="/manage-categories">
                    Manage Categories
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;