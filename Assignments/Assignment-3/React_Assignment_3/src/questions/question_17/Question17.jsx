import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Question17 = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    axios
      .get('https://dummyjson.com/users/1')
      .then((res) => {
        setUser({
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          email: res.data.email,
        });
      })
      .catch(() => setMessage('Error loading user'));
  }, []);


  const handleUpdate = () => {
    axios
      .put('https://dummyjson.com/users/1', user)
      .then(() => setMessage('User Updated!'))
      .catch(() => setMessage('Update Failed'));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '350px' }}>
      <h3>Edit User</h3>

      <label>First Name:</label>
      <input
        type="text"
        value={user.firstName}
        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
        style={styles.input}
      />

      <label>Last Name:</label>
      <input
        type="text"
        value={user.lastName}
        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
        style={styles.input}
      />

      <label>Email:</label>
      <input
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        style={styles.input}
      />

      <button onClick={handleUpdate} style={styles.btn}>
        Update User
      </button>

      {message && <p>{message}</p>}
    </div>
  );
};

const styles = {
  input: {
    display: 'block',
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  btn: {
    padding: '10px 15px',
    background: 'blue',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default Question17;
