import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loggedInContext } from "./Logged-In-Context";

function UserItems() {
  const { itemId } = useParams();
  const { loggedIn, setLoggedIn, user_id } = useContext(loggedInContext);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  const handleItemChange = (itemId, field, value) => {
    const itemIndex = inventoryItems.findIndex(item => item.id === itemId);
    const updatedItems = [...inventoryItems];
    updatedItems[itemIndex][field] = value;
    updatedItems[itemIndex].changed = true;
    setInventoryItems(updatedItems);
  };

  useEffect(() => {
    fetch(`http://localhost:8081/inventory/${user_id}`)
      .then(response => response.json())
      .then(data => {
        setInventoryItems(data);
      })
      .catch(error => {
        console.error('Error fetching inventory items:', error);
      });
  }, [user_id]);

  const handleToggleEditMode = () => {
    setEditMode(prevMode => !prevMode);
  };

  const handleDeleteItem = (itemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      fetch(`http://localhost:8081/delete-item/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(response => {
        if (response.ok) {
          const updatedInventoryItems = inventoryItems.filter(item => item.id !== itemId);
          setInventoryItems(updatedInventoryItems);
          console.log("Item deleted successfully:", itemId);
        } else {
          console.error("Failed to delete item:", itemId);
        }
      })
      .catch(error => {
        console.error("Error deleting item:", error);
      });
    }
  };

  const handleSaveChanges = () => {
    const updatedItems = [...inventoryItems];

    updatedItems.forEach((item, index) => {
      if (item.changed) {
        fetch(`http://localhost:8081/update-item/${item.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(item)
        })
        .then(response => {
          if (response.ok) {
            console.log("Item updated successfully:", item.id);
          } else {
            console.error("Failed to update item:", item.id);
          }
        })
        .catch(error => {
          console.error("Error updating item:", error);
        });
      }
    });
    setEditMode(false);
    setInventoryItems(updatedItems);
  };

  const handleAddItem = () => {
    navigate('/add-item')
  };

  const handleItemClick = (itemId) => {
    navigate(`/item-details/${itemId}`);
  };

  const truncateDescription = (description) => {
    return description.length > 100 ? `${description.substring(0, 100)}...` : description;
  };

  return (
    <div>
      <div>
        <h1>Your Inventory Items</h1>
        <table>
          <thead>
            <tr>
              <th>Equipment</th>
              <th>Count</th>
              <th>Description</th>
              {editMode && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {inventoryItems.map((item, index) => (
              <tr key={item.id}>
                <td>
                  {editMode ? (
                    <input
                      type="text"
                      value={item.equipment}
                      onChange={(e) => handleItemChange(item.id, 'equipment', e.target.value)}
                    />
                  ) : (
                    <button onClick={() => handleItemClick(item.id)}>{item.equipment}</button>
                  )}
                </td>
                <td>
                  {editMode ? (
                    <input
                      type="text"
                      value={item.count}
                      onChange={(e) => handleItemChange(item.id, 'count', e.target.value)}
                    />
                  ) : (
                    item.count
                  )}
                </td>
                <td>
                  {editMode ? (
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                    />
                  ) : (
                    truncateDescription(item.description)
                  )}
                </td>
                <td>
                  {editMode ? (
                    <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          {editMode ? (
            <>
              <button onClick={handleSaveChanges}>Save Changes</button>
              <button onClick={handleToggleEditMode}>Cancel</button>
              <button onClick={handleAddItem}>Add Item</button>
            </>
          ) : (
            <button onClick={handleToggleEditMode}>Edit</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserItems;
