/*
15. Create a profile object in state (name, email, phone).
Add inputs to edit and update each field.
*/

import React, { useState } from 'react';

const Question15 = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target);
    

    setProfile((prev) => ({
      ...prev,
      [name]: value, 
    }));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Edit Profile</h2>

      <div style={{ marginBottom: '10px' }}>
        <label>Name: </label>
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleChange}
          style={{ padding: '8px', width: '250px' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Email: </label>
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          style={{ padding: '8px', width: '250px' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Phone: </label>
        <input
          type="number"
          name="phone"
          value={profile.phone}
          onChange={handleChange}
          style={{ padding: '8px', width: '250px' }}
        />
      </div>

      <h3>Live Preview</h3>
      <p>
        <strong>Name:</strong> {profile.name}
      </p>
      <p>
        <strong>Email:</strong> {profile.email}
      </p>
      <p>
        <strong>Phone:</strong> {profile.phone}
      </p>
    </div>
  );
};

export default Question15;
