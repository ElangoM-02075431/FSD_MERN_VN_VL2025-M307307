/*
3. Create a <ProfileCard> component that takes props: name, role, and image.
Use it three times with different data.
*/

import React from 'react';

const ProfileCard = ({ name, role, image }) => {
  return (
    <div
      style={{
        width: '200px',
        padding: '15px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        textAlign: 'center',
      }}
    >
      <img
        src={image}
        alt={name}
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
          borderRadius: '8px',
        }}
      />
      <h3>{name}</h3>
      <p>{role}</p>
    </div>
  );
};

const Question3 = () => {
  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <ProfileCard
        name="Elango"
        role="MERN Stack Developer"
        image="../../../public/person1.jpeg"
      />

      <ProfileCard name="Priya" role="UI/UX Designer" image="../../../public/person3.jpeg" />

      <ProfileCard name="Karankumar" role="Project Manager" image="../../../public/person2.jpeg" />
    </div>
  );
};

export default Question3;
