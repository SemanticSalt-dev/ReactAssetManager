import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import NavBar from './components/NavBar';
import InventoryView from './components/InventoryView';
import AddItemForm from './components/AddItemForm';
import AddCategoryForm from './components/AddCategoryForm';
import ManageCategories from './components/ManageCategories';
import './App.css';



function App() {
  const [categories, setCategories] = useState(() => {
    const storedCategories = localStorage.getItem('categories');
    return storedCategories ? JSON.parse(storedCategories) : [
      { id: 1, name: 'Electronics' },
      { id: 2, name:'Furniture' }
    ];
  });

  const [inventory, setInventory] = useState(() => {
    const storedInventory = localStorage.getItem('inventory');
    return storedInventory ? JSON.parse(storedInventory) : [
      { id: 1, name: 'Laptop', categoryId: 1, quantity: 1 },
      { id: 2, name: 'Secretlab Titan Chair', categoryId: 2, quantity: 1 },
      { id: 3, name: 'Adjustable Height Desk', categoryId: 2, quantity: 1 }
    ];
  });

  useEffect(() => {
    localStorage.setItem('inventory', JSON.stringify(inventory));
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [inventory, categories]);

  const addItem = (newItem) => {
    setInventory([...inventory, { ...newItem, id: Date.now() }]);
    toast.success('Item added successfully!');
  };

  const addCategory = (newCategory) => {
    setCategories([...categories, { ...newCategory, id: Date.now() }]);
    toast.success('Category added successfully!');
  };

  const deleteItem = (itemId) => {
    setInventory(inventory.filter((item) => item.id !== itemId));
    toast.success('Item deleted successfully!')
  };

  const updateItem = (updatedItem) => {
    setInventory(
      inventory.map((item) => (item.id === updatedItem.id ? updatedItem :item))
    );
    toast.success('Item updated successfully!');
  }

  const deleteCategory = (categoryId) => {
    const isCategoryInUse = inventory.some((item) => item.categoryId === categoryId);
    if (isCategoryInUse) {
      toast.error('Cannot delete category. It is currently in use by one or more items.');
    } else {
      setCategories(categories.filter((category) => category.id !== categoryId));
      toast.success('Category deleted successfully!');
    }
  };

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <NavBar />
          <Routes>
            <Route
              path="/"
              element={<InventoryView inventory={inventory} categories={categories} deleteItem={deleteItem} updateItem={updateItem} />}
            />
            <Route
              path="/add-item"
              element={<AddItemForm addItem={addItem} categories={categories} />}
            />
            <Route
              path="/add-category"
              element={<AddCategoryForm addCategory={addCategory} />}
            />
            <Route path="/manage-categories" element={<ManageCategories categories={categories} deleteCategory={deleteCategory} />} />
          </Routes>
          <ToastContainer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
