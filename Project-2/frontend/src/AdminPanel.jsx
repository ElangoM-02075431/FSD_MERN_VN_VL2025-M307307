import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Modal, Form, Table } from 'react-bootstrap';
import { useAuth } from './AuthContext.jsx';

const API_URL = 'https://backend-8gua.onrender.com';

function AdminPanel() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '', price: '', image: '', category: '', description: '', stock: 10
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/products`);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await axios.put(`${API_URL}/api/products/${editingProduct._id}`, formData);
      } else {
        await axios.post(`${API_URL}/api/products`, formData);
      }
      handleClose();
      fetchProducts();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      description: product.description,
      stock: product.stock
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this product permanently?')) {
      try {
        await axios.delete(`${API_URL}/api/products/${id}`);
        fetchProducts();
      } catch (err) {
        alert('Error deleting');
      }
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormData({ name: '', price: '', image: '', category: '', description: '', stock: 10 });
  };

  if (!user || user.email !== 'admin@example.com') {
    return <Container className="my-5 text-center"><h2>Access Denied – Admin Only</h2></Container>;
  }

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Admin Panel – Manage Products ({products.length})</h1>
        <Button variant="success" onClick={() => setShowModal(true)}>Add New Product</Button>
      </div>

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td><img src={product.image} alt={product.name} style={{ width: '70px', height: '70px', objectFit: 'contain' }} /></td>
              <td>{product.name}</td>
              <td>₹{product.price}</td>
              <td>{product.category}</td>
              <td>{product.stock}</td>
              <td>
                <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(product)}>Edit</Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(product._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editingProduct ? 'Edit Product' : 'Add New Product'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Price (₹)</Form.Label>
                  <Form.Control type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Control value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} required />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} required />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              {editingProduct ? 'Update Product' : 'Add Product'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default AdminPanel;
