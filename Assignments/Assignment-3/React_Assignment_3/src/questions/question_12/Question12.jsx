/*
12. Show “Loading…” while fetching, and if the request fails, show “Error loading data”.
*/

import React, { useEffect, useState } from 'react';

const Question12 = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(false); 

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/rr')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network error');
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (error) {
    return <h3 style={{ color: 'red' }}>Error loading data</h3>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Products</h2>

      {products.map((p) => (
        <div
          key={p.id}
          style={{
            border: '1px solid #ccc',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '8px',
          }}
        >
          <h3>{p.title}</h3>
          <p>Price: ₹{p.price}</p>
          <p>Category: {p.category}</p>
        </div>
      ))}
    </div>
  );
};

export default Question12;
