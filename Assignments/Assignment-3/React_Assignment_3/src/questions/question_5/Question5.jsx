/*
5. Create a small form with “Name” and “Email” fields.
On submit, display both values below without refreshing the page.
*/

import React, { useState } from 'react';

const Question5 = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [submittedName, setSubmittedName] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); 

    setSubmittedName(name);
    setSubmittedEmail(email);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Simple Form</h3>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              padding: '8px',
              marginLeft: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: '8px',
              marginLeft: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            background: 'blue',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Submit
        </button>
      </form>

      {submittedName && submittedEmail && (
        <div style={{ marginTop: '20px' }}>
          <h4>Submitted Data:</h4>
          <p>
            <strong>Name:</strong> {submittedName}
          </p>
          <p>
            <strong>Email:</strong> {submittedEmail}
          </p>
        </div>
      )}
    </div>
  );
};

export default Question5;
