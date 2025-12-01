import React, { useState } from 'react';
import axios from 'axios';

const Question16 = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://dummyjson.com/posts/add', {
        title,
        body,
      });
      setMessage('Post Added!');
    } catch (error) {
      setMessage(`Error adding post${error}`);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Add Post</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <br />

        <textarea placeholder="Body" value={body} onChange={(e) => setBody(e.target.value)} />
        <br />
        <br />

        <button type="submit">Submit</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Question16;
