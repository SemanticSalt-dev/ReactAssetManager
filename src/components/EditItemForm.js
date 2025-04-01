import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Paper, Typography } from '@mui/material';
import './styles/AddItemForm.css';

function EditItemForm({ item, categories, updateItem, onCancel}) {
    const [name, setName] = useState(item.name);
    const [categoryId, setCategoryId] = useState(item.categoryId);
    const [quantity, setQuantity] = useState(item.quantity);
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = {};

        if (!name.trim()) {
            validationErrors.name = 'Item name is required';
        }

        if (quantity < 1) {
            validationErrors.quantity = 'Quantity must be at least 1';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        updateItem({ id: item.id, name, categoryId, quantity });
        onCancel();
    };

    return (
        <Paper elevation={3} className="add-item-paper">
            <Typography variant="h5" gutterBottom>
            Edit Item
            </Typography>
            <form onSubmit={handleSubmit} className="add-item-form">
                <TextField
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={!!errors.name} // Convert error messages to boolean
                  helperText={errors.name}
                  fullWidth
                  margin="normal"
                />
                <FormControl>
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
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  error={!!errors.quantity} // Convert error message to boolean
                  helperText={errors.quantity}
                  fullWidth
                  margin="normal"
                  InputProps={{ inputProps: { min: 1 } }}
                />
                <Button onClick={onCancel}>Cancel</Button>
                <Button type="submit" variant="contained" color="primary" className="add-item-button">
                    Update Item
                </Button>
            </form>
        </Paper>
    );
}

export default EditItemForm;