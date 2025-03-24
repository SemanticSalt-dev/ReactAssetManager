import React from "react";
import './styles/Item.css';

function Item({ item, category, deleteItem }) {
    const handleDeleteClick = () => {
        if (window.confirm(`Are you sure you want to delete ${item.name}?`)) {
            deleteItem(item.id);
        }
    };

    return (
        <li>
            {item.name} ({category}) - Quantity: {item.quantity}
            <button onClick={handleDeleteClick}>Delete</button>
        </li>
    );
};

export default Item;