import React, { useState } from 'react';
import { TextField, Button, Paper, Typography } from '@mui/material';
import './styles/AddCategoryForm.css';

function AddCategoryForm({ addCategory, categories = [] }) {
    const [categoryName, setCategoryName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!categoryName.trim()) {
            setError('Category name is required');
            return;
        }

        if (categoryName.trim().length > 50) {
            setError('Category name must be 50 characters or less');
            return;
        }

        // Check for duplicate category names (case-insensitive)
        const isDuplicate = categories.some(
            category => category.name.toLowerCase() === categoryName.trim().toLowerCase()
        );

        if (isDuplicate) {
            setError('Category name already exists');
            return;
        }

        try {
            addCategory({ name: categoryName.trim() });
            console.log('Category Submitted:', categoryName);
            setCategoryName('');
            setError('');
        } catch (err) {
            setError(err.message || 'Failed to add category. Please try again.');
        }
    };
    
    return (
        <Paper className="add-category-paper">
            <Typography variant="h5" gutterBottom>
                Add category
            </Typography>
            <form className="add-category-form" onSubmit={handleSubmit}>
                <TextField 
                  label="Category Name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  fullWidth
                  margin="normal"
                  error={!!error}
                  helperText={error}
                />
                <Button type="submit" variant="contained" color="primary" className="add-category-button">
                    Add Category
                </Button>
            </form>
        </Paper>
    );
}

export default AddCategoryForm;