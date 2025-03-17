import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import InventoryView from './components/InventoryView';
import AddItemForm from './components/AddItemForm';
import AddCategoryForm from './components/AddCategoryForm';
import './App.css';



function App() {
  const [inventory, setInventory] = useState(() => {
    const storedInventory = localStorage.getItem('inventory');
    return storedInventory ? JSON.parse(storedInventory) : [
      { id: 1, name: 'Laptop', category: 'Electronics', quantity: 1 },
      { id: 2, name: 'Secretlab Titan Chair', category: 'Furniture', quantity: 1 },
      { id: 3, name: 'Adjustable Height Desk', category: 'Furniture', quantity: 1 }
    ];
  });

  useEffect(() => {
    localStorage.setItem('inventory', JSON.stringify(inventory));
  }, [inventory]);

  const addItem = (newItem) => {
    setInventory([...inventory, { ...newItem, id: Date.now() }]);
  };

  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<InventoryView inventory={inventory} />} />
          <Route path="/add-item" element={<AddItemForm addItem={addItem} />} />
          <Route path="/add-category" element={<AddCategoryForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
