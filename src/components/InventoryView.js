import React, { useState } from 'react';
import { List, ListItem, ListItemText, Button, Paper, Typography } from '@mui/material';
import EditItemForm from './EditItemForm';
import './styles/InventoryView.css';

function InventoryView({ inventory, categories, deleteItem, updateItem }) {
    const [editItemId, setEditItemId] = useState(null);

    const handleEditClick = (id) => {
        setEditItemId(id);
    };

    const handleCancelEdit = () => {
        setEditItemId(null);
    };

    return (
        <Paper elevation={3} className="inventory-paper">
            <Typography variant="h4" gutterBottom>
                Inventory
            </Typography>
            <List>
                {inventory.map((item) => {
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