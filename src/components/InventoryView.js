import React, { useState } from 'react';
import Item from './Item';
import './styles/InventoryView.css';

function InventoryView({ inventory, categories, deleteItem }) {
    

    return (
    <div className="inventory-container">
        <h2>Inventory</h2>
        <ul className="inventory-list">
            {inventory.map((item) => {
                const foundCategory = categories.find((cat) => cat.id === item.categoryId);
                return (
                    <Item 
                      key={item.id}
                      item={item}
                      category={foundCategory ? foundCategory.name : 'Unknown'}
                      deleteItem={deleteItem}
                    />
                );
            })}
        </ul>
    </div>
    );
}

export default InventoryView;