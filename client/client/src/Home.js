import React, { useState, useEffect } from 'react';

function Home() {
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
    <div>
      <h1>Welcome to my Inventory Manager</h1>
      <p>Players and/or Inventory managers, please login to edit equipment</p>
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
              <tr key={`${item.id}-${index}`}>
                <td>{item.username}</td>
                <td>{item.equipment}</td>
                <td>{item.count}</td>
                <td>{truncateDescription(item.description)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;