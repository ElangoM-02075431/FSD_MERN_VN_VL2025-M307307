import React, { useEffect, useState } from 'react';
import DepartmentCard from '../components/DepartmentCard';

const Departments = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    
    fetch('/src/data/departments.json')
      .then((res) => res.json())
      .then((data) => setDepartments(data))
      .catch((err) => console.error('Error loading JSON:', err));
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-center fw-bold mb-4">Our Departments</h2>

      <div className="row">
        {departments.map((dept) => (
          <DepartmentCard
            key={dept.id}
            id={dept.id}
            name={dept.name}
            description={dept.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Departments;
