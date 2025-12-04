import React from 'react';
import { useParams } from 'react-router-dom';
import departmentsData from '../data/departments.json';

const DepartmentDetails = () => {
  const { id } = useParams();

  
  const department = departmentsData.find((dept) => dept.id === id);

  if (!department) {
    return (
      <div className="container my-5">
        <h3 className="text-center">Department not found</h3>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="fw-bold mb-3">{department.name}</h2>

  
      <p className="lead">{department.fullDescription}</p>

      <hr />

  
      <h4 className="fw-bold mt-4">Courses Offered</h4>
      <ul className="list-group mb-4">
        {department.courses.map((course, index) => (
          <li className="list-group-item" key={index}>
            {course}
          </li>
        ))}
      </ul>

  
      <h4 className="fw-bold mt-4">Faculty Members</h4>
      <ul className="list-group mb-4">
        {department.faculty.map((name, index) => (
          <li className="list-group-item" key={index}>
            {name}
          </li>
        ))}
      </ul>

  
      <h4 className="fw-bold mt-4">Labs / Facilities</h4>
      <ul className="list-group mb-5">
        {department.labs.map((lab, index) => (
          <li className="list-group-item" key={index}>
            {lab}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DepartmentDetails;
