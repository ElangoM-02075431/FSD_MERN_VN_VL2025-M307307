import React from 'react';

const Question2 = () => {
  const isLoggedIn = true;

  return (
    <div>
      {isLoggedIn ? (
        <h1 className="display-1">Welcome back!</h1>
      ) : (
        <h1 className="display-1">Please log in</h1>
      )}

      </div>
  );
};

export default Question2;
