import React from 'react';
import { useParams } from 'react-router-dom';

function ItemDetails() {
  const { itemId } = useParams();

  // Fetch item details based on itemId
  // You can implement this logic as per your requirement

  return (
    <div>
      <h1>Item Details</h1>
      <p>Item ID: {itemId}</p>
      {/* Render item details here */}
    </div>
  );
}

export default ItemDetails;