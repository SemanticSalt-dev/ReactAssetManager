import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/AddCategoryForm.css';

function AddCategoryForm({ addCategory }) {
    const [categoryName, setCategoryName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!categoryName.trim()) {
            setError('Category name is required');
            return;
        }

        addCategory({ name: categoryName });
        console.log('Category Submitted:', categoryName);
        setCategoryName('');
        setError('');
        toast.success('Category added successfully!', {
            position: 'bottom-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
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
                    {error && <p className="error-message">{error}</p>}
                </div>
                <button type="submit">Add Category</button>
            </form>
        </div>
    );
}

export default AddCategoryForm;