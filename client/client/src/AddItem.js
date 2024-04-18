import React, { useState, useContext } from 'react';
import { loggedInContext } from "./Logged-In-Context";
import { useNavigate } from 'react-router-dom';

function AddItem({ onSave }) {
  const { loggedIn, user_id } = useContext(loggedInContext);
  const [equipment, setEquipment] = useState('');
  const [count, setCount] = useState(0);
  const [description, setDescription] = useState('');
  const navigate = useNavigate();


  const handleSave = async () => {
    if (loggedIn) {
      const newItem = {
        equipment: equipment,
        count: count,
        description: description,
        user_id: user_id
      };
      try {
        const response = await fetch('http://localhost:8081/add-item', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newItem)
        });

        if (response.ok) {
          alert('Item added successfully!');

          setEquipment('');
          setCount('');
          setDescription('');
          navigate('/UserItems');
        } else {
          alert('Failed to add item. Please try again.');
        }
      } catch (error) {
        console.error('Error adding item:', error);
        alert('An error occurred. Please try again.');
      }
    } else {
      alert('Please log in before adding an item.');
    }
  };

  return (
    <div>
      <h2>Add Item</h2>
      <form>
        <label>
          Equipment:
          <input
            type="text"
            value={equipment}
            onChange={(e) => setEquipment(e.target.value)}
          />
        </label>
        <br />
        <label>
          Count:
          <input
            type="text"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
        </label>
        <br />
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleSave}>
          Save
        </button>
      </form>
    </div>
  );
}

export default AddItem;
