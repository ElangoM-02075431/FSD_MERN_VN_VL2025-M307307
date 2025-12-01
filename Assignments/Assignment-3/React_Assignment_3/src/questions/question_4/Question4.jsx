/*
4. Create an input field for “Username.” When the user types,
display the entered name live below it.
*/

import React, { useState } from 'react';

const Question4 = () => {
  const [username, setUsername] = useState('');

  return (
    <div style={{ padding: '20px' }}>
      <h3>Enter Username:</h3>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{
          padding: '8px',
          width: '250px',
          borderRadius: '5px',
          border: '1px solid #ccc',
        }}
      />

      <h4 style={{ marginTop: '20px' }}>
        Live Preview: <span style={{ color: 'blue' }}>{username}</span>
      </h4>
    </div>
  );
};

export default Question4;
