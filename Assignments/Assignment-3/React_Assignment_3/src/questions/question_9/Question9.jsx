/*
9. Create a search bar that filters and displays matching student names
from an array as you type.
*/

import { useState } from 'react';

const Question9 = () => {
  const [search, setSearch] = useState('');

  const students = [
    'Santhosh kumar',
    'Priya',
    'Maha lakshmi',
    'Arun',
    'Vishnu',
    'Meenakshi',
    'Dinesh karthik',
    'sridivya',
    'Saran',
    'Rahul',
  ];

  const filteredStudents = students.filter((name) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      <h3>Student Search</h3>

      <input
        type="text"
        placeholder="Search student..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: '8px',
          width: '250px',
          borderRadius: '5px',
          border: '1px solid #ccc',
        }}
      />

      <div style={{ marginTop: '20px' }}>
        <h4>Results:</h4>
        <ul>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student, index) => <li key={index}>{student}</li>)
          ) : (
            <p>No match found</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Question9;
