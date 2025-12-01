/* 7. Create a parent component with a function showAlert().
Pass it as a prop to a child and call it on button click.
*/

import React from 'react';

const Question7 = () => {
  const showAlert = () => {
    alert('Button clicked from Child Component!');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Parent Component</h3>
      <Child showAlert={showAlert} />
    </div>
  );
};

export default Question7;

const Child = ({ showAlert }) => {
  return (
    <div>
      <button
        onClick={showAlert}
        style={{
          padding: '10px 20px',
          borderRadius: '5px',
          background: 'blue',
          color: 'white',
          border: 'none',
        }}
      >
        Click Me
      </button>
    </div>
  );
};
