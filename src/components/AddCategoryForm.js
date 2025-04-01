import React, { useState } from 'react';
import { TextField, Button, Paper, Typography } from '@mui/material';
import './styles/AddCategoryForm.css';

function AddCategoryForm({ addCategory }) {
    const [categoryName, setCategoryName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!categoryName.trim()) {
            setError('Category name is required');
            return;
        }

        addCategory({ name: categoryName });
        console.log('Category Submitted:', categoryName);
        setCategoryName('');
        setError('');
    };
    
    return (
        <Paper elevation={3} className="add-category-paper">
            <Typography variant="h5" gutterBottom>
                Add category
            </Typography>
            <form onSubmit={handleSubmit} className="add-category-form">
                <TextField 
                  label="Category Name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  error={!!error}
                  helperText={error}
                  fullWidth
                  margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" className="add-category-button">
                    Add Category
                </Button>
            </form>
        </Paper>
        // <div className="add-category-form-container">
        //     <h2>Add Category</h2>
        //     <form onSubmit={handleSubmit}>
        //         <div className="from-group">
        //             <label htmlFor="categoryName">Category Name:</label>
        //             <input
        //               type="text"
        //               id="categoryName"
        //               value={categoryName}
        //               onChange={(e) => setCategoryName(e.target.value)}
        //             />
        //             {error && <p className="error-message">{error}</p>}
        //         </div>
        //         <button type="submit">Add Category</button>
        //     </form>
        // </div>
    );
}

export default AddCategoryForm;