import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Home() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const { itemId } = useParams();

  useEffect(() => {
    fetch('http://localhost:8081/')
      .then(result => result.json())
      .then(data => {
        setItems(data)
      })
      .catch(error => console.error("Error fetching", error));
  }, []);

  const truncateDescription = (description) => {
    return description.length > 100 ? `${description.substring(0, 100)}...` : description;
  };

  const handleItemClick = (itemId) => {
    navigate(`/item-details/${itemId}`);
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
              <tr key={`${item.id}`}>
                <td>{item.username}</td>
                <td><button onClick={() => handleItemClick(item.id)}>{item.equipment}</button></td>
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