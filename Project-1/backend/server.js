const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Book = require('./models/Book');  // We import Book model directly
require('dotenv').config();



const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch(err => console.log('DB Connection Error:', err));

// Simple route to test server
app.get('/', (req, res) => {
  res.send('Backend is running! Welcome to your Indian Bookstore 📚');
});

// GET all books - This will show your 50 seeded books
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Optional: Search by title/author/genre
app.get('/api/books/search', async (req, res) => {
  const { q } = req.query;
  try {
    const books = await Book.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { author: { $regex: q, $options: 'i' } },
        { genre: { $regex: q, $options: 'i' } }
      ]
    });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



app.get('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Simple in-memory users (for dev – later use DB)
let users = [];

// Register
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const isAdmin = email === 'admin@example.com';  // ← Automatically true for admin email
  const user = { 
    id: Date.now().toString(), 
    name, 
    email, 
    password, 
    isAdmin 
  };
  users.push(user);
  res.json({ message: 'Registered successfully' });
});

// Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  let user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  // Force admin flag if email matches
  if (email === 'admin@example.com') {
    user = { ...user, isAdmin: true };
  }

  res.json({ 
    token: 'fake-jwt-token',
    user: { name: user.name, email: user.email, isAdmin: user.isAdmin }
  });
});




// CREATE - Add new book (from admin panel)
app.post('/api/books', async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: 'Error adding book' });
  }
});

// UPDATE - Edit book (from admin panel)
app.put('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: 'Error updating book' });
  }
});

// DELETE - Delete book (from admin panel)
app.delete('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting book' });
  }
});

const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Visit: http://localhost:${PORT}/api/books to see your 50 books!`);
  });