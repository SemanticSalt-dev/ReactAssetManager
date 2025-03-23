import React, { useState } from 'react';
import './styles/AddItemForm.css';

function AddItemForm({ addItem, categories }) {
    console.log(categories);
    const [name, setName] = useState('');
    const [categoryId, setCategoryId] = useState(categories[0].id);
    const [quantity, setQuantity] = useState('1');

    const handleSubmit = (e) => {
        e.preventDefault();
        addItem({ name, categoryId, quantity });
        setName('');
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
                    <label htmlFor="categoryId">Category:</label>
                    <select
                      id="categoryId"
                      value={categoryId}
                      onChange={(e) => setCategoryId(parseInt(e.target.value))}
                      className="category-dropdown"
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                      ))}
                    </select>
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