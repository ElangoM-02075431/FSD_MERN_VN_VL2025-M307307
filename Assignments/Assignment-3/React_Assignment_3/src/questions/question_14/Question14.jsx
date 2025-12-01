import React, { useState } from 'react';

const Question14 = () => {
  const [fruits, setFruits] = useState(['Apple', 'Banana', 'Orange']);
  const [newFruit, setNewFruit] = useState('');

  const addFruit = (e) => {
    e.preventDefault();
    if (newFruit.trim() === '') return;

    setFruits([...fruits, newFruit]); 
    setNewFruit('');
  };

  const deleteFruit = (index) => {
    const updated = fruits.filter((_, i) => i !== index);
    console.log(updated);
    
    setFruits(updated);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Fruit List</h3>

      <form onSubmit={addFruit}>
        <input
          type="text"
          placeholder="Enter fruit"
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

      <ul style={{ marginTop: '15px' }}>
        {fruits.map((fruit, index) => (
          <li key={index} style={{ marginBottom: '8px' }}>
            {fruit}
            <button onClick={() => deleteFruit(index)} className="btn btn-danger">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question14;
