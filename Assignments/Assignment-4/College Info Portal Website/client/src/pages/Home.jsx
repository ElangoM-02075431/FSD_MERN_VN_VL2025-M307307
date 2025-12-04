import React from 'react';
import { Link } from 'react-router-dom';
import DepartmentCard from '../components/DepartmentCard';

const Home = () => {
  return (
    <>
      <div className="bg-primary text-light text-center py-5">
        <div className="container">
          <h1 className="fw-bold">Welcome to Our College</h1>
          <p className="lead">Empowering students with knowledge, innovation, and excellence.</p>
          <Link to="/about" className="btn btn-light btn-lg mt-3">
            Learn More
          </Link>
        </div>
      </div>

      <div className="container my-5">
        <h2 className="text-center mb-4 fw-bold">Why This College?</h2>

        <div className="row text-center">
          <div className="col-md-4 mb-3">
            <div className="p-4 shadow-sm rounded bg-white">
              <h5 className="fw-bold">Experienced Faculty</h5>
              <p>Our highly qualified faculty ensures quality education.</p>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="p-4 shadow-sm rounded bg-white">
              <h5 className="fw-bold">Modern Infrastructure</h5>
              <p>Well-equipped labs, digital classrooms, and smart campus.</p>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="p-4 shadow-sm rounded bg-white">
              <h5 className="fw-bold">Career Opportunities</h5>
              <p>Placement training and industry collaborations.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-5">
        <h2 className="text-center mb-4 fw-bold">Top Departments</h2>

        <div className="row">
          <DepartmentCard
            id="cse"
            name="Computer Science Engineering"
            description="Focuses on programming, algorithms, and cutting-edge technologies."
          />

          <DepartmentCard
            id="ece"
            name="Electronics & Communication Engineering"
            description="Deals with electronics, circuits, and communication systems."
          />

          <DepartmentCard
            id="mech"
            name="Mechanical Engineering"
            description="Covers machines, engines, and manufacturing technologies."
          />
        </div>
      </div>

      <div className="text-center mb-5">
        <Link to="/departments" className="btn btn-primary btn-lg mx-2">
          Explore Departments
        </Link>
        <Link to="/contact" className="btn btn-outline-primary btn-lg mx-2">
          Contact Us
        </Link>
      </div>
    </>
  );
};

export default Home;
