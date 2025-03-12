import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import InventoryView from './components/InventoryView';
import AddItemForm from './components/AddItemForm';
import AddCategoryForm from './components/AddCategoryForm';
import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<InventoryView />} />
          <Route path="/add-item" element={<AddItemForm />} />
          <Route path="/add-category" element={<AddCategoryForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
