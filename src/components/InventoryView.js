import React, { useState } from 'react';
import { List, ListItem, ListItemText, Button, Paper, Typography } from '@mui/material';
import './styles/InventoryView.css';

function InventoryView({ inventory, categories, deleteItem }) {
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
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() => {
                                if (window.confirm(`Are you sure you want to delete ${item.name}?`)) {
                                  deleteItem(item.id);
                                }
                              }}
                            >
                                Delete
                            </Button>
                        </div>
                    );
                })}
            </List>
        </Paper>
    );
}

export default InventoryView;