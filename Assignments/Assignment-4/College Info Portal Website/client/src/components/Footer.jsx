import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light mt-5 pt-4 pb-3">
      <div className="container">
        <div className="row">
          
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">College Portal</h5>
            <p>A complete information website for students, faculty, and visitors.</p>
          </div>

          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-decoration-none text-light">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-decoration-none text-light">
                  About
                </a>
              </li>
              <li>
                <a href="/departments" className="text-decoration-none text-light">
                  Departments
                </a>
              </li>
              <li>
                <a href="/contact" className="text-decoration-none text-light">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">Contact</h5>
            <p className="mb-1">📍 Chennai, India</p>
            <p className="mb-1">📧 info@college.com</p>
            <p>📞 +91 98765 43210</p>
          </div>
        </div>

        <hr className="border-light" />

        <div className="text-center">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} College Portal. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
