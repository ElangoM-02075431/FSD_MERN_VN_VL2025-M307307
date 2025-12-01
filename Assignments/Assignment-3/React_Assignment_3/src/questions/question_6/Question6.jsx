// 6. Display an array of product objects (id, name, price) in a `<table>` using `.map()`.

// import React, { useState } from 'react'

const Question6 = () => {
  const products = [
    { id: 1, name: 'Laptop', price: 55000 },
    { id: 2, name: 'Mouse', price: 599 },
    { id: 3, name: 'Keyboard', price: 1299 },
    { id: 4, name: 'Headphones', price: 2499 },
    { id: 5, name: 'Smartphone', price: 29999 },
    { id: 6, name: 'Monitor', price: 8999 },
    { id: 7, name: 'USB Cable', price: 199 },
    { id: 8, name: 'Power Bank', price: 1499 },
    { id: 9, name: 'Bluetooth Speaker', price: 1999 },
    { id: 10, name: 'Smartwatch', price: 3999 },
    { id: 11, name: 'Tablet', price: 15999 },
    { id: 12, name: 'Webcam', price: 1299 },
    { id: 13, name: 'Charger', price: 799 },
    { id: 14, name: 'External Hard Drive', price: 4999 },
    { id: 15, name: 'Gaming Chair', price: 8999 },
  ];
  
  return (
    <div style={{margin:"30px"}}>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">NAME</th>
            <th scope="col">PRICE</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product)=>{ return(
          <tr key={product.id}>
            <th scope="row">{product.id}</th>
            <td>{product.name}</td>
            <td>{product.price}</td>
          </tr>)
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Question6
