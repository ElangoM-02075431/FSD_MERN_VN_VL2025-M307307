import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Footer from '../components/Footer';
import Header from '../components/Header';

import About from '../pages/About';
import Contact from '../pages/Contact';
import DepartmentDetails from '../pages/DepartmentDetails';
import Departments from '../pages/Departments';
import Home from '../pages/Home';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Header />

      <div style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/departments/:id" element={<DepartmentDetails />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
};

export default AppRouter;
