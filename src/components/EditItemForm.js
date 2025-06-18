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
        } else if (name.trim().length > 100) {
            validationErrors.name = 'Item name must be 100 characters or less';
        }

        const quantityValue = parseInt(quantity);
        if (isNaN(quantityValue) || quantityValue < 1) {
            validationErrors.quantity = 'Quantity must be a valid number at least 1';
        } else if (quantityValue > 999999) {
            validationErrors.quantity = 'Quantity must be less than 1,000,000';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        updateItem({ id: item.id, name: name.trim(), categoryId, quantity: quantityValue });
        onCancel();
    };

    return (
        <Paper elevation={3} className="add-item-paper">
            <Typography variant="h5" gutterBottom>
                Edit Item
            </Typography>
            <form onSubmit={handleSubmit} className="add-item-form" role="form">
                <TextField
                  label="Item Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={!!errors.name}
                  helperText={errors.name}
                  fullWidth
                  margin="normal"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                      labelId="category-label"
                      id="categoryId"
                      value={categoryId}
                      onChange={(e) => {
                        const parsedValue = parseInt(e.target.value);
                        if (!isNaN(parsedValue)) {
                          setCategoryId(parsedValue);
                        }
                      }}
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
                  error={!!errors.quantity}
                  helperText={errors.quantity}
                  fullWidth
                  margin="normal"
                  InputProps={{ inputProps: { min: 1 } }}
                />
                <div>
                    <Button 
                      onClick={onCancel} 
                      variant="outlined" 
                      color="secondary" 
                      style={{ marginRight: '8px' }}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="primary" className="add-item-button">
                        Update Item
                    </Button>
                </div>
            </form>
        </Paper>
    );
}

export default EditItemForm;