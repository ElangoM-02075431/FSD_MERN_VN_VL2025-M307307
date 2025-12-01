import React, { useEffect, useState } from 'react';

const Question18 = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0); 

  const usersPerPage = 5;

  useEffect(() => {
    fetch('https://dummyjson.com/users?limit=20')
      .then((res) => res.json())
      .then((data) => setUsers(data.users))
      .catch((err) => console.log(err));
  }, []);


  const start = page * usersPerPage;
  const end = start + usersPerPage;
  const visibleUsers = users.slice(start, end);

  const nextPage = () => {
    if (page < Math.floor(users.length / usersPerPage)) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Users </h2>

      <ul>
        {visibleUsers.map((user) => (
          <li key={user.id}>
            {user.firstName} {user.lastName}
          </li>
        ))}
      </ul>

      <div style={{ marginTop: '20px' }}>
        <button onClick={prevPage} disabled={page === 0}>
          Prev
        </button>

        <span style={{ margin: '0 15px' }}>
          Page {page + 1} / {Math.ceil(users.length / usersPerPage)}
        </span>

        <button onClick={nextPage} disabled={page === Math.floor(users.length / usersPerPage)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Question18;
