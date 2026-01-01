import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Navbar, Nav, Badge } from 'react-bootstrap';
import { useCart } from './CartContext.jsx';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CartPage from './CartPage.jsx';

function Home() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('All');
  const { addToCart, cartCount } = useCart();

  useEffect(() => {
    axios.get('/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  const categories = ['All', 'Footwear', 'Electronics', 'Laptops', 'Wearables', 'Clothing'];

  const filteredProducts = category === 'All' 
    ? products 
    : products.filter(p => p.category === category);

  return (
    <>
      <Navbar bg="dark" variant="dark" sticky="top" className="mb-4">
        <Container>
          <Navbar.Brand as={Link} to="/">🛒 Shopez</Navbar.Brand>
          <Nav className="me-auto">
            {categories.map(cat => (
              <Nav.Link key={cat} onClick={() => setCategory(cat)} active={category === cat}>
                {cat}
              </Nav.Link>
            ))}
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/cart" className="position-relative text-white">
              Cart 🛍️
              {cartCount > 0 && (
                <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                  {cartCount}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="my-5">
        <h1 className="text-center mb-5">Welcome to Shopez</h1>
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {filteredProducts.map(product => (
            <Col key={product._id}>
              <Card className="h-100 shadow hover-shadow">
                <Card.Img variant="top" src={product.image} style={{ height: '300px', objectFit: 'contain', padding: '20px' }} />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text className="text-muted">{product.category}</Card.Text>
                  <Card.Text className="mt-auto">
                    <strong className="text-success fs-4">₹{product.price}</strong>
                  </Card.Text>
                  <Button variant="primary" onClick={() => addToCart(product)}>
                    Add to Cart 🛒
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
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
