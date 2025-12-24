import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Modal, Form, Table } from 'react-bootstrap';
import { useAuth } from './AuthContext.jsx';

function AdminPanel() {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState({
    title: '', author: '', genre: '', price: '', description: '', image: ''
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    axios.get('http://localhost:5000/api/books')
      .then(res => setBooks(res.data));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingBook) {
      await axios.put(`http://localhost:5000/api/books/${editingBook._id}`, formData);
    } else {
      await axios.post('http://localhost:5000/api/books', formData);
    }
    setShowModal(false);
    setEditingBook(null);
    setFormData({ title: '', author: '', genre: '', price: '', description: '', image: '' });
    fetchBooks();
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
    if (window.confirm('Delete this book?')) {
      await axios.delete(`http://localhost:5000/api/books/${id}`);
      fetchBooks();
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
        <h1>Admin Panel - Manage Books</h1>
        <Button variant="success" onClick={() => setShowModal(true)}>Add New Book</Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
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
          {books.map(book => (
            <tr key={book._id}>
              <td><img src={book.image} alt="" style={{ width: '60px', objectFit: 'contain' }} /></td>
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
          ))}
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