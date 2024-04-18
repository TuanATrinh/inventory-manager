import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ItemDetails() {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8081/item-details/${itemId}`)
      .then(response => response.json())
      .then(data => {
        setItem(data);
      })
      .catch(error => {
        console.error('Error fetching item details:', error);
      });
  }, [itemId]);

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Item Details</h1>
      <table>
        <tbody>
          <tr>
            <td>Equipment Name:</td>
            <td>{item.equipment}</td>
          </tr>
          <tr>
            <td>Count:</td>
            <td>{item.count}</td>
          </tr>
          <tr>
            <td>Description:</td>
            <td>{item.description}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ItemDetails;
