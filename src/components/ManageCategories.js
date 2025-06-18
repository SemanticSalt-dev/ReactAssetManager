import React, { useState } from 'react';
import { List, ListItem, ListItemText, IconButton, Paper, Typography, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { TextField } from '@mui/material';
import './styles/ManageCategories.css';

function ManageCategories({ categories, deleteCategory, updateCategory }) {
    const [editCategoryId, setEditCategoryId] = useState(null);
    const [editedCategoryName, setEditedCategoryName] = useState('');

    const handleEditClick = (id, name) => {
        setEditCategoryId(id);
        setEditedCategoryName(name);
    };

    const handleCancelEdit = () => {
        setEditCategoryId(null);
        setEditedCategoryName('');
    };

    const handleUpdateCategory = (id) => {
        if (!editedCategoryName.trim()) {
            return;
        }

        if (editedCategoryName.trim().length > 50) {
            return;
        }

        // Check for duplicate category names (case-insensitive, excluding current category)
        const isDuplicate = categories.some(
            category => 
                category.id !== id && 
                category.name.toLowerCase() === editedCategoryName.trim().toLowerCase()
        );

        if (isDuplicate) {
            return;
        }

        updateCategory({ id, name: editedCategoryName.trim() });
        setEditCategoryId(null);
        setEditedCategoryName('');
    };

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
                        <div>
                            {editCategoryId === category.id ? (
                                <div>
                                    <TextField 
                                    value={editedCategoryName}
                                    onChange={(e) => setEditedCategoryName(e.target.value)}
                                    size="small"
                                    />
                                    <Button size="small" onClick={() => handleUpdateCategory(category.id)}>
                                        Update
                                    </Button>
                                    <Button size="small" onClick={handleCancelEdit}>
                                        Cancel
                                    </Button>
                                </div>
                            ) : (
                                <div>
                                    <IconButton
                                    edge="end"
                                    aria-label="editCategory"
                                    onClick={()=> handleEditClick(category.id, category.name)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                    edge="end"
                                    aria-label="deleteCategory"
                                    onClick={() => handleDeleteCategory(category.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            )}
                        </div>
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