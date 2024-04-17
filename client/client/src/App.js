import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import ItemDetails from './ItemDetails';
import Login from './Login';
import CreateUser from './CreateUser';
import './App.css'; // Import your CSS file

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/')
      .then(result => result.json())
      .then(data => {
        setItems(data.map(item => ({ ...item, expanded: false }))); // Add expanded property to each item
      })
      .catch(error => console.error("Error fetching", error));
  }, []);

  const truncateDescription = (description) => {
    return description.length > 100 ? `${description.substring(0, 100)}...` : description;
  };

  return (
    <Router>
      <>
        <div className="container">
          <nav className="nav-container">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/create-user" className="nav-link">
              Create User
            </Link>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/item-details" element={<ItemDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-user" element={<CreateUser />} />
          </Routes>
        </div>
      </>
    </Router>
  );
}

export default App;
