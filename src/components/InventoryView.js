import React, { useState } from 'react';
import Item from './Item';
import './styles/InventoryView.css';

function InventoryView() {
    const [inventory, setInventory] = useState([
        { id: 1, name: 'Laptop', category: 'Electronics', quantity: 1 },
        { id: 2, name: 'Secretlab Titan Chair', category: 'Furniture', quantity: 1 },
        { id: 3, name: 'Adjustable Height Desk', category: 'Furniture', quantity: 1 }
    ]);

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