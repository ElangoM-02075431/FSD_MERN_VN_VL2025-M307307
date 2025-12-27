import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Modal, Form, Table, FormControl } from 'react-bootstrap';

function AdminPanel() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState({
    title: '', author: '', genre: '', price: '', description: '', image: ''
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get('https://bookstore-blrf.onrender.com/api/books');
      setBooks(res.data);
      setFilteredBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Live search in admin panel
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredBooks(books);
    } else {
      const lowerSearch = searchTerm.toLowerCase();
      const filtered = books.filter(book =>
        book.title.toLowerCase().includes(lowerSearch) ||
        book.author.toLowerCase().includes(lowerSearch) ||
        book.genre.toLowerCase().includes(lowerSearch)
      );
      setFilteredBooks(filtered);
    }
  }, [searchTerm, books]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBook) {
        await axios.put(`https://bookstore-blrf.onrender.com/api/books/${editingBook._id}`, formData);
      } else {
        await axios.post('https://bookstore-blrf.onrender.com/api/books', formData);
      }
      handleClose();
      fetchBooks();
    } catch (err) {
      console.error(err);
      alert('Error saving book');
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      genre: book.genre,
      price: book.price,
      description: book.description,
      image: book.image
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this book permanently?')) {
      try {
        await axios.delete(`https://bookstore-blrf.onrender.com/api/books/${id}`);
        fetchBooks();
      } catch (err) {
        alert('Error deleting book');
      }
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setEditingBook(null);
    setFormData({ title: '', author: '', genre: '', price: '', description: '', image: '' });
  };

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Admin Panel - Manage Books ({filteredBooks.length})</h1>
        <Button variant="success" onClick={() => setShowModal(true)}>
          Add New Book
        </Button>
      </div>

      {/* Search Bar in Admin Panel */}
      <Form className="mb-4">
        <FormControl
          type="search"
          placeholder="Search by title, author, or genre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-500"
        />
      </Form>

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-4">
                No books found
              </td>
            </tr>
          ) : (
            filteredBooks.map(book => (
              <tr key={book._id}>
                <td>
                  <img 
                    src={book.image} 
                    alt={book.title} 
                    style={{ width: '70px', height: '100px', objectFit: 'contain' }} 
                  />
                </td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>₹{book.price}</td>
                <td>
                  <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(book)}>
                    Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(book._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editingBook ? 'Edit Book' : 'Add New Book'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Author</Form.Label>
                  <Form.Control value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})} required />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Genre</Form.Label>
                  <Form.Control value={formData.genre} onChange={(e) => setFormData({...formData, genre: e.target.value})} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Price (₹)</Form.Label>
                  <Form.Control type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} required />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              {editingBook ? 'Update Book' : 'Add Book'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default AdminPanel;
