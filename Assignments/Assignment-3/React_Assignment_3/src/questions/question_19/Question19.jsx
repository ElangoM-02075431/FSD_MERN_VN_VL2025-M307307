/*19. Build a 3-page app — Home, About, Products — and link them using react-router-dom. */

import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Question10 from './components/question_10/Question10';

const Question19 = () => {
  return (
    <div>
      <BrowserRouter>
        <nav style={{ display: 'flex', gap: '20px', padding: '20px' }}>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/products">Products</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Question10/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Question19
