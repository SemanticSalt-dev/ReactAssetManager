import React, { useState } from 'react';
import { List, ListItemText, Paper, Typography, Button, TextField, FormControl, InputLabel, Select, MenuItem, } from '@mui/material';
import DeleteItem from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditItemForm from './EditItemForm';
import './styles/InventoryView.css';

function InventoryView({ inventory, categories, deleteItem, updateItem }) {
    const [editItemId, setEditItemId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');

    const handleEditClick = (id) => {
        setEditItemId(id);
    };

    const handleCancelEdit = () => {
        setEditItemId(null);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFilterChange = (event) => {
        setFilterCategory(event.target.value);
    };

    const filteredAndCategorizedInventory = inventory.filter((item) => {
        const searchTextMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const categoryMatch = filterCategory === 'all' || item.categoryId === parseInt(filterCategory);
        return searchTextMatch && categoryMatch;
    });

    return (
        <Paper elevation={3} className="inventory-paper">
            <Typography variant="h4" gutterBottom>
                Inventory
            </Typography>
            <div className="inventory-filters">
                <TextField 
                  label="Search Terms"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  size="small"
                  margin="dense"
                />
                <FormControl size="small" margin="dense">
                    <InputLabel id="filter-category-label">Filter by Category</InputLabel>
                    <Select
                      labelId="filter-category-label"
                      id="filter-category"
                      value={filterCategory}
                      onChange={handleFilterChange}
                      label="Filter by Category"
                    >
                        <MenuItem value="all">All</MenuItem>
                        {categories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <List>
                {filteredAndCategorizedInventory.map((item) => {
                    const category = categories.find((cat) => cat.id === item.categoryId);
                    return (
                        <div key={item.id} className="inventory-item">
                            <ListItemText
                                primary={item.name}
                                secondary={`Category: ${category ? category.name : 'Unknown'}, Quantity: ${item.quantity}`}
                            />
                            <div>
                                <Button
                                  variant="outlined"
                                  color="primary"
                                  size="small"
                                  style={{ marginRight: '8px' }}
                                  onClick={() => handleEditClick(item.id)}
                                >
                                    {editItemId === item.id ? 'Editing..' : 'Edit'}
                                </Button>
                                <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                onClick={() => {
                                    if (window.confirm(`Are you sure you want to delete ${item.name}?`)) {
                                    deleteItem(item.id);
                                    }
                                }}
                                >
                                    Delete
                                </Button>
                            </div>
                            {editItemId === item.id && (
                                <EditItemForm 
                                  item={item}
                                  categories={categories}
                                  updateItem={updateItem}
                                  onCancel={handleCancelEdit}
                                />
                            )}
                        </div>
                    );
                })}
            </List>
        </Paper>
    );
}

export default InventoryView;