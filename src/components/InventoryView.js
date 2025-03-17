import React, { useState } from 'react';
import Item from './Item';
import './styles/InventoryView.css';

function InventoryView({ inventory }) {
    

    return (
    <div className="inventory-container">
        <h2>Inventory</h2>
        <ul className="inventory-list">
            {inventory.map((item) => (
                <Item key={item.id} item={item} />
            ))}
        </ul>
    </div>
    );
}

export default InventoryView;