import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Container, Row, Col, Card, Button, Navbar, Nav, Form, Badge 
} from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useCart } from './CartContext.jsx';
import { useAuth } from './AuthContext.jsx';
import AuthModal from './components/AuthModal.jsx';
import CartPage from './CartPage.jsx';

function Home() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart, cartCount } = useCart();
  const { user, logout } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    axios.get('/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  const categories = ['All', 'Footwear', 'Electronics', 'Laptops', 'Wearables', 'Clothing'];

  const filteredProducts = products
    .filter(p => category === 'All' || p.category === category)
    .filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <>
      <Navbar bg="dark" variant="dark" sticky="top" className="mb-4 py-3">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">🛒 Shopez</Navbar.Brand>
          
          <Form className="d-flex mx-auto" style={{ maxWidth: '500px' }}>
            <Form.Control
              type="search"
              placeholder="Search products..."
              className="me-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Form>

          <Nav className="align-items-center">
            <Nav.Link as={Link} to="/cart" className="position-relative text-white me-4">
              Cart 🛍️
              {cartCount > 0 && (
                <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                  {cartCount}
                </Badge>
              )}
            </Nav.Link>

            {user ? (
              <Nav.Link className="text-white d-flex align-items-center">
                Hello, {user.name || user.email}!
                <Button variant="outline-light" size="sm" className="ms-3" onClick={logout}>
                  Logout
                </Button>
              </Nav.Link>
            ) : (
              <Button variant="outline-light" onClick={() => setShowAuth(true)}>
                Login / Register
              </Button>
            )}
          </Nav>
        </Container>
      </Navbar>

      <Container>
        <Nav className="justify-content-center mb-5 gap-3 flex-wrap">
          {categories.map(cat => (
            <Button
              key={cat}
              variant={category === cat ? "primary" : "outline-primary"}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </Nav>

        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {filteredProducts.length === 0 ? (
            <Col className="text-center my-5">
              <h3>No products found</h3>
              <p className="text-muted">Try different keywords or category</p>
            </Col>
          ) : (
            filteredProducts.map(product => (
              <Col key={product._id}>
                <Card className="h-100 shadow hover-shadow border-0">
                  <div className="text-center p-4 bg-light">
                    <Card.Img 
                      variant="top" 
                      src={product.image} 
                      style={{ height: '280px', objectFit: 'contain' }} 
                    />
                  </div>
                  <Card.Body className="d-flex flex-column p-4">
                    <Card.Title className="fw-bold">{product.name}</Card.Title>
                    <Card.Text className="text-muted flex-grow-1">{product.description}</Card.Text>
                    <Card.Text className="text-muted small">{product.category}</Card.Text>
                    <Card.Text className="mt-auto">
                      <strong className="text-success fs-3">₹{product.price}</strong>
                    </Card.Text>
                    <Button 
                      variant="primary" 
                      size="lg" 
                      className="mt-3"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart 🛒
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>

      <AuthModal show={showAuth} onHide={() => setShowAuth(false)} />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
