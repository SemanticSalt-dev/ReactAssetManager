import React, { useState } from 'react';
import './styles/AddCategoryForm.css';

function AddCategoryForm({ addCategory }) {
    const [categoryName, setCategoryName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addCategory({ name: categoryName });
        console.log('Category Submitted:', categoryName);
        setCategoryName('');
    };
    
    return (
        <div className="add-category-form-container">
            <h2>Add Category</h2>
            <form onSubmit={handleSubmit}>
                <div className="from-group">
                    <label htmlFor="categoryName">Category Name:</label>
                    <input
                      type="text"
                      id="categoryName"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                    />
                </div>
                <button type="submit">Add Category</button>
            </form>
        </div>
    );
}

export default AddCategoryForm;