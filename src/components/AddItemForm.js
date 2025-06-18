import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Paper, Typography } from '@mui/material';
import './styles/AddItemForm.css';

function AddItemForm({ addItem, categories }) {
    const [name, setName] = useState('');
    const [categoryId, setCategoryId] = useState(categories.length > 0 ? categories[0].id : null);
    const [quantity, setQuantity] = useState(1);
    const [nameError, setNameError] = useState('');
    const [quantityError, setQuantityError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        let hasError = false;

        if (!name.trim()) {
            setNameError('Item name is required');
            hasError = true;
        } else if (name.trim().length > 100) {
            setNameError('Item name must be 100 characters or less');
            hasError = true;
        } else {
            setNameError('');
        }

        const quantityValue = parseFloat(quantity);
        if (isNaN(quantityValue) || quantityValue <= 0) {
            setQuantityError('Quantity must be at least 1');
            hasError = true;
        } else if (!Number.isInteger(quantityValue)) {
            setQuantityError('Quantity must be an integer');
            hasError = true;
        } else if (quantityValue > 999999) {
            setQuantityError('Quantity must be less than 1,000,000');
            hasError = true;
        } else {
            setQuantityError('');
        }

        if (hasError) {
            return;
        }

        addItem({ name: name.trim(), categoryId, quantity: quantityValue });
        setName('');
        setQuantity(1);
        setNameError('');
        setQuantityError('');
    };

    return (
        <Paper elevation={3} className="add-item-paper">
            <Typography variant="h5" gutterBottom>
                Add Item
            </Typography>
            {categories.length === 0 ? (
                <Typography variant="body1" color="text.secondary">
                    No categories available. Please add a category first.
                </Typography>
            ) : (
                <form onSubmit={handleSubmit} className="add-item-form" role="form">
                    <TextField
                      label="Item Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      error={!!nameError}
                      helperText={nameError}
                      fullWidth
                      margin="normal"
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                          labelId="category-label"
                          id="categoryId"
                          value={categoryId}
                          onChange={(e) => setCategoryId(parseInt(e.target.value))}
                          label="Category"
                        >
                            {categories.map((category) => (
                                <MenuItem key={category.id} value={category.id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                      label="Quantity"
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      error={!!quantityError}
                      helperText={quantityError}
                      fullWidth
                      margin="normal"
                      inputProps={{ min: 1, step: 1 }}
                    />
                    <Button type="submit" variant="contained" color="primary" className="add-item-button">
                        Add Item
                    </Button>
                </form>
            )}
        </Paper>
    );
}

export default AddItemForm;