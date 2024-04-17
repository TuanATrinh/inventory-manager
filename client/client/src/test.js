import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState('');

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

  const toggleDescription = (index) => {
    setItems(prevItems => {
      const updatedItems = [...prevItems];
      updatedItems[index].expanded = !updatedItems[index].expanded;
      return updatedItems;
    });
  };

  const toggleExpanded = itemId => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, expanded: !item.expanded } : item
      )
    );
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8081/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to login');
      }

      setAuthenticated(true);
      setError('');
    } catch (error) {
      setAuthenticated(false);
      setError('Invalid username or password');
      console.error('Error logging in:', error);
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleContinueAsGuest = () => {
    setAuthenticated(true); // Set to false to display inventory as guest
  };

  return (
    <>
      <h1>Welcome to my Inventory Manager</h1>
      {!authenticated ? (
        <div>
          <h2>Login</h2>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleInputChange}
          />
          <button onClick={handleLogin}>Login</button>
          {error && <p>{error}</p>}
          <button onClick={handleContinueAsGuest}>Continue as Guest</button>
        </div>
      ) : (
        <div>
          <h2>Logged in as {username}</h2>
          <button onClick={handleLogout}>Logout</button>
          {/* Render inventory items */}
          <div>
            <h1>All Inventory Items</h1>
            <table>
              <thead>
                <tr>
                  <th>Player</th>
                  <th>Equipment</th>
                  <th>Count</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item.id}>
                    <td>{item.username}</td>
                    <td>{item.equipment}</td>
                    <td>{item.count}</td>
                    <td>
                      {item.expanded ? item.description : truncateDescription(item.description)}
                      {item.description.length > 100 && (
                        <button onClick={() => toggleDescription(index)}>
                          {item.expanded ? 'Show Less' : 'Show More'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}


export default App;
