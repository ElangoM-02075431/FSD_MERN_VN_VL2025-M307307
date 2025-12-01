
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Products from './Products';
import Electronics from './Electronics';
import Fashion from './Fashion';

const Question20 = () => {
  return (
    <BrowserRouter>
      <h2>Products Page</h2>
      <nav style={{ display: 'flex', gap: '20px' }}>
        <Link to="/">Products </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Products />}>
          <Route path="electronics" element={<Electronics />} />
          <Route path="fashion" element={<Fashion />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Question20;
