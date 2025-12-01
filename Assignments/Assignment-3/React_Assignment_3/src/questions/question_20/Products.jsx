import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Products = () => {
  return (
    <div>
      <h3>Products Section</h3>

      <nav style={{ display: 'flex', gap: '20px' }}>
        <Link to="electronics">Electronics</Link>
        <Link to="fashion">Fashion</Link>
      </nav>

      <Outlet />
    </div>
  );
};

export default Products;
