import React from 'react';
import data from './data.json';

const Question10 = () => {
  return (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap',objectFit:"contain" }}>
      {data.map((product) => (
        <div
          key={product.id}
          style={{
            width: '250px',
            padding: '15px',
            border: '1px solid #ccc',
            borderRadius: '10px',
          }}
        >
          <img src={product.image} alt={product.title} width="100%" />

          <h4>{product.title}</h4>
          <p>₹{product.price}</p>
          <p>{product.category}</p>
        </div>
      ))}
    </div>
  );
};

export default Question10;
