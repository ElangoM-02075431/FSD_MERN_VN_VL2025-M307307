import React from 'react';
import { Link } from 'react-router-dom';

const DepartmentCard = ({ id, name, description }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card p-3 shadow-sm animated-card">
        <h5 className="fw-bold">{name}</h5>
        <p>{description}</p>
        <Link to={`/departments/${id}`} className="btn btn-primary mt-2">
          View More
        </Link>
      </div>
    </div>
  );
};

export default DepartmentCard;
