/*
13. Start with an array of fruits in state.
Add a form to insert new fruits dynamically into the list.
*/

import { useState } from 'react';

const Question13 = () => {
  const [fruits, setFruits] = useState(['Apple', 'Banana', 'Mango']);
  const [newFruit, setNewFruit] = useState('');

  const addFruit = (e) => {
    e.preventDefault();

    if (newFruit.trim() === '') return;

    setFruits([...fruits, newFruit]);
    setNewFruit('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Fruit List</h3>

      <form onSubmit={addFruit}>
        <input
          type="text"
          placeholder="Enter fruit name"
          value={newFruit}
          onChange={(e) => setNewFruit(e.target.value)}
          style={{
            padding: '8px',
            marginRight: '10px',
            borderRadius: '5px',
            border: '1px solid gray',
          }}
        />

        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>

      <ul style={{ marginTop: '20px' }}>
        {fruits.map((fruit, index) => (
          <li key={index}>{fruit}</li>
        ))}
      </ul>
    </div>
  );
};

export default Question13;
