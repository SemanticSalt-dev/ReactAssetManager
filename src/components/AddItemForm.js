import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Paper, Typography } from '@mui/material';
import './styles/AddItemForm.css';

function AddItemForm({ addItem, categories }) {
    const [name, setName] = useState('');
    const [categoryId, setCategoryId] = useState(categories[0].id);
    const [quantity, setQuantity] = useState('1');
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

        addItem({ name, categoryId, quantity });
        setName('');
        setQuantity(1);
        setErrors({});
    };

    return (
        <Paper elevation={3} className="add-item-paper">
            <Typography variant="h5" gutterBottom>
                Add Item
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
                  InputProps={{ min: 1 }}
                />
                <Button type="submit" variant="contained" color="primary" className="add-item-button">
                    Add Item
                </Button>
            </form>
        </Paper>
        // <div className="add-item-form-container">
        //     <h2>Add Item</h2>
        //     <form onSubmit={handleSubmit}>
        //         <div className="form-group">
        //             <label htmlFor="name">Name:</label>
        //             <input
        //               type="text"
        //               id="name"
        //               value={name}
        //               onChange={(e) => setName(e.target.value)}
        //             />
        //             {errors.name && <p className="error-message">{errors.name}</p>}
        //         </div>
        //         <div className="form-group">
        //             <label htmlFor="categoryId">Category:</label>
        //             <select
        //               id="categoryId"
        //               value={categoryId}
        //               onChange={(e) => setCategoryId(parseInt(e.target.value))}
        //               className="category-dropdown"
        //             >
        //               {categories.map((category) => (
        //                 <option key={category.id} value={category.id}>
        //                     {category.name}
        //                 </option>
        //               ))}
        //             </select>
        //         </div>
        //         <div className="form-group">
        //             <label htmlFor="quantity">Quantity:</label>
        //             <input
        //               type="number"
        //               id="quantity"
        //               value={quantity}
        //               onChange={(e) => setQuantity(parseInt(e.target.value))}
        //             />
        //             {errors.quantity && <p className="error-message">{errors.quantity}</p>}
        //         </div>
        //         <button type="submit" >Add Item</button>
        //     </form>
        // </div>
    );
}

export default AddItemForm;