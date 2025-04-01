import React from 'react';
import { List, ListItem, ListItemText, IconButton, Paper, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import './styles/ManageCategories.css'

function ManageCategories({ categories, deleteCategory }) {
    const handleDeleteCategory = (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            deleteCategory(id);
        }
    };

    return (
        <Paper elevation={3} className="manage-categories-paper">
            <Typography variant="h4" gutterBottom>
                Manage Categories
            </Typography>
            <List>
                {categories.map((category) => (
                    <ListItem
                      key={category.id}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleDeleteCategory(category.id)}
                        >
                            <DeleteIcon />
                        </IconButton>
                      }
                    >
                        <ListItemText primary={category.name} />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
}

export default ManageCategories;