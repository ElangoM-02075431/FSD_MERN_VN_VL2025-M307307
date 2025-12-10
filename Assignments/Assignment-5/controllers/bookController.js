const Book = require('../models/book');

// Add a new book
exports.addBook = async (req, res) => {
  try {
    const { title, author, publishedYear, genre } = req.body;
    const newBook = new Book({ title, author, publishedYear, genre });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const { genre } = req.query;
    let query = {};
    if (genre) {
      query.genre = genre;
    }
    const books = await Book.find(query).sort({ publishedYear: 1 });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a book by ID
exports.updateBook = async (req, res) => {
  try {
    const { title, author, publishedYear, genre } = req.body;
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, { title, author, publishedYear, genre }, { new: true });
    if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a book by ID
exports.deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
