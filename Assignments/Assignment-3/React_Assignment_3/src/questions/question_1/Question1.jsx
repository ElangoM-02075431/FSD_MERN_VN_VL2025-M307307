import { useState } from 'react';

const Question1 = () => {
  let students = [
    { id: 1, name: 'karan Kumar', dept: 'CSE', year: 2022 },
    { id: 2, name: 'Shree Divya', dept: 'ECE', year: 2023 },
    { id: 3, name: 'Mohan Raj', dept: 'MECH', year: 2021 },
    { id: 4, name: 'Keerthi', dept: 'IT', year: 2024 },
    { id: 5, name: 'Santhosh kumarr', dept: 'CSE', year: 2023 },
    { id: 6, name: 'Harish', dept: 'EEE', year: 2022 },
    { id: 7, name: 'Nivetha', dept: 'CIVIL', year: 2020 },
    { id: 8, name: 'Praveen', dept: 'IT', year: 2021 },
    { id: 9, name: 'Swathi', dept: 'ECE', year: 2024 },
    { id: 10, name: 'Ragul dravid', dept: 'MECH', year: 2023 },
    { id: 11, name: 'Kavya', dept: 'CSE', year: 2021 },
    { id: 12, name: 'Vigneshwaran', dept: 'EEE', year: 2024 },
    { id: 13, name: 'Meenakshi', dept: 'IT', year: 2022 },
    { id: 14, name: 'Lokesh', dept: 'CIVIL', year: 2023 },
    { id: 15, name: 'Sneha', dept: 'CSE', year: 2020 },
  ];

  const [student, setStudents] = useState(students);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap',gap:"20px",justifyContent:"space-around",marginTop:"10px" }}>
      {student.map((ele) => {
        return (
          <div key={ele.id} className="card" style={{ width: '18rem', marginBottom: '20px' }}>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">{ele.name}</li>
              <li className="list-group-item">{ele.dept}</li>
              <li className="list-group-item">{ele.year}</li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Question1;
