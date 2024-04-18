import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Home from './Home';
import ItemDetails from './ItemDetails';
import Login from './Login';
import CreateUser from './CreateUser';
import UserItems from './UserItems'
import Logout from './Logout'
import AddItem from './AddItem'
import './App.css';
import { loggedInContext } from "./Logged-In-Context.js";

function App() {
  const [items, setItems] = useState([]);
  const { loggedIn, setLoggedIn } = useContext(loggedInContext);
  const navigate = useNavigate()

  useEffect(() => {
    fetch('http://localhost:8081/')
      .then(result => result.json())
      .then(data => {
        setItems(data.map(item => ({ ...item, expanded: false })));
      })
      .catch(error => console.error("Error fetching", error));
  }, [loggedIn]);

  const truncateDescription = (description) => {
    return description.length > 100 ? `${description.substring(0, 100)}...` : description;
  };
  const handleLogout = () => {
    setLoggedIn(false);
    navigate('/')
  };

  return (

      <>
        <div className="container">
          <nav className="nav-container">
            <Link to="/" className="nav-link">
            {loggedIn ? 'All Inventory' : 'Home'}
            </Link>
            {loggedIn ? (
            <>
              <Link to="/logout" className="nav-link" onClick={handleLogout}>
                Logout
              </Link>
              <Link to="/UserItems" className="nav-link">
                Your Inventory
              </Link>
            </>
        ) : (
          <Link to="/login" className="nav-link">
            Login
          </Link>
        )}
            <Link to="/create-user" className="nav-link">
              Create User
            </Link>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/UserItems" element={<UserItems />} />
            <Route path="/item-details/:itemId" element={<ItemDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-user" element={<CreateUser />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/add-item" element={<AddItem />} />
          </Routes>
        </div>
      </>

  );
}

export default App;
