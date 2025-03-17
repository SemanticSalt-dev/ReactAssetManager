import React, { useState } from 'react';
import './styles/AddItemForm.css';

function AddItemForm({ addItem }) {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState('1');

    const handleSubmit = (e) => {
        e.preventDefault();
        addItem({ name, category, quantity });
        setName('');
        setCategory('');
        setQuantity(1);
    };

    return (
        <div className="add-item-form-container">
            <h2>Add Item</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <input
                      type="text"
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                      type="number"
                      id="quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                    />
                </div>
                <button type="submit" >Add Item</button>
            </form>
        </div>
    );
}

export default AddItemForm;