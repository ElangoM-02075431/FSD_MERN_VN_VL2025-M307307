import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container, Row, Col, Card, Navbar, Button, Nav, Form, Badge, NavDropdown
} from 'react-bootstrap';
import { Routes, Route, Link } from 'react-router-dom';
import { useCart } from './CartContext.jsx';
import { useAuth } from './AuthContext.jsx';
import AuthModal from './components/AuthModal.jsx';
import CartPage from './CartPage.jsx';
import AdminPanel from './AdminPanel.jsx';

const API_URL = 'https://backend-8gua.onrender.com';

function Home() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart, cartCount } = useCart();
  const { user, logout } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    axios.get(`${API_URL}/api/products`)
      .then(res => setProducts(res.data))  // Fixed: was [res.data](http://res.data)
      .catch(err => console.log('Error loading products:', err));
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
      {/* Single, Clean, Professional Header */}
      <Navbar bg="dark" variant="dark" sticky="top" expand="lg" className="py-3 shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold fs-3">
            🛒 Shopez
          </Navbar.Brand>

          {/* Category Dropdown for Mobile + Horizontal Links for Desktop */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto align-items-center">
              {/* Desktop: Horizontal Category Links */}
              <div className="d-none d-lg-flex gap-3">
                {categories.map(cat => (
                  <Nav.Link
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={category === cat ? 'text-primary fw-bold' : 'text-white'}
                    style={{ cursor: 'pointer' }}
                  >
                    {cat}
                  </Nav.Link>
                ))}
              </div>

              {/* Mobile: Category Dropdown */}
              <NavDropdown
                title="Categories"
                id="categories-dropdown"
                className="d-lg-none text-white"
              >
                {categories.map(cat => (
                  <NavDropdown.Item
                    key={cat}
                    onClick={() => setCategory(cat)}
                    active={category === cat}
                  >
                    {cat}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </Nav>

            {/* Search Bar */}
            <Form className="d-flex mx-lg-auto my-2 my-lg-0" style={{ maxWidth: '400px' }}>
              <Form.Control
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="me-2"
              />
            </Form>

            {/* Right Side: Cart, Admin, Login */}
            <Nav className="align-items-center gap-3 ms-lg-4">
              <Nav.Link as={Link} to="/cart" className="position-relative text-white">
                Cart 🛍️
                {cartCount > 0 && (
                  <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                    {cartCount}
                  </Badge>
                )}
              </Nav.Link>

              {user && user.email === 'admin@example.com' && (
                <Nav.Link as={Link} to="/admin" className="text-white">
                  Admin Panel
                </Nav.Link>
              )}

              {user ? (
                <div className="text-white d-flex align-items-center gap-2">
                  <span>Hello, {user.name || user.email}!</span>
                  <Button variant="outline-light" size="sm" onClick={logout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <Button variant="outline-light" onClick={() => setShowAuth(true)}>
                  Login / Register
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container className="my-5">
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {filteredProducts.length === 0 ? (
            <Col className="text-center my-5 col-12">
              <h3>No products found</h3>
              <p className="text-muted">Try different keywords or category</p>
            </Col>
          ) : (
            filteredProducts.map(product => (
              <Col key={product._id}>
                <Card className="h-100 shadow-sm hover-shadow border-0 transition">
                  <div className="text-center p-4 bg-light">
                    <Card.Img
                      variant="top"
                      src={product.image}
                      alt={product.name}
                      style={{ height: '280px', objectFit: 'contain' }}
                    />
                  </div>
                  <Card.Body className="d-flex flex-column p-4">
                    <Card.Title className="fw-bold fs-5">{product.name}</Card.Title>
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
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/admin" element={<AdminPanel />} />
    </Routes>
  );
}

export default App;
