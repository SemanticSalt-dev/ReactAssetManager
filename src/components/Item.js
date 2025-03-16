import React from "react";
import './styles/Item.css';

function Item({ item }) {
    return (
        <li>
            {item.name} ({item.category}) - Quantity: {item.quantity}
        </li>
    );
};

export default Item;