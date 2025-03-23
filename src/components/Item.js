import React from "react";
import './styles/Item.css';

function Item({ item, category }) {
    return (
        <li>
            {item.name} ({category}) - Quantity: {item.quantity}
        </li>
    );
};

export default Item;