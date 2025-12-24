import { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar, Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Routes, Route, Link } from 'react-router-dom';
import { useCart } from './CartContext.jsx';
import { useAuth } from './AuthContext.jsx';  // ← New import
import Cart from './Cart.jsx';
import Wishlist from './Wishlist.jsx';
import AuthModal from './AuthModal.jsx';      // ← New import
import AdminPanel from './AdminPanel.jsx';


function BookDetail() {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = window.location.pathname.split('/').pop();
    axios.get(`https://bookstore-blrf.onrender.com//api/books/${id}`)
      .then(res => {
        setBook(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <h2 className="text-center my-5">Loading...</h2>;
  if (!book) return <h2 className="text-center my-5">Book not found</h2>;

  return (
    <Container className="my-5">
      <Link to="/" className="btn btn-secondary mb-4">← Back to Home</Link>
      <Row className="g-5">
        <Col md={5}>
          <Card className="border-0 shadow p-3 bg-light">
            <Card.Img src={book.image} style={{ height: '550px', objectFit: 'contain' }} />
          </Card>
        </Col>
        <Col md={7}>
          <Badge bg="info" className="mb-3">{book.genre}</Badge>
          <h1 className="fw-bold">{book.title}</h1>
          <p className="text-muted fs-3">by {book.author}</p>
          <div className="my-4">
            <span className="text-warning fs-4">★★★★★</span>
            <span className="ms-3 text-muted">4.8 (245 reviews)</span>
          </div>
          <h2 className="text-success fw-bold mb-4">₹{book.price}</h2>

          <Button
            variant={isInWishlist(book._id) ? "danger" : "outline-danger"}
            className="me-3 mb-3"
            onClick={() => toggleWishlist(book)}
          >
            {isInWishlist(book._id) ? '❤️ In Wishlist' : '🤍 Add to Wishlist'}
          </Button>

          <Button variant="success" size="lg" onClick={() => addToCart(book)}>
            Add to Cart 🛒
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

function Home() {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('https://bookstore-blrf.onrender.com//api/books')
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <div className="bg-dark text-white py-5 text-center">
        <Container>
          <h1 className="display-4 fw-bold">Indian Bookstore</h1>
          <p className="lead">50+ Classic Books • Kafka • Dostoevsky • Austen</p>
        </Container>
      </div>

      <Container className="my-5">
        <h2 className="text-center mb-5">All Books ({books.length})</h2>
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {books.map(book => (
            <Col key={book._id}>
              <Card className="h-100 shadow hover-shadow">
                <div className="text-center p-4 bg-light">
                  <Card.Img src={book.image} style={{ height: '320px', objectFit: 'contain' }} />
                </div>
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fw-bold">{book.title}</Card.Title>
                  <Card.Text className="text-muted">by {book.author}</Card.Text>
                  <Card.Text className="mt-auto">
                    <strong className="text-success fs-4">₹{book.price}</strong>
                  </Card.Text>
                  <div className="d-grid gap-2 mt-3">
                    <Button
                      variant={isInWishlist(book._id) ? "danger" : "outline-danger"}
                      onClick={() => toggleWishlist(book)}
                    >
                      {isInWishlist(book._id) ? '❤️ In Wishlist' : '🤍 Add to Wishlist'}
                    </Button>
                    <Button variant="primary" onClick={() => addToCart(book)}>
                      Add to Cart 🛒
                    </Button>
                    <Link to={`/book/${book._id}`} className="btn btn-outline-secondary">
                      View Details
                    </Link>
                  </div>
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
  const { cartCount, wishlist } = useCart();
  const { user, logout } = useAuth();           // ← Get user info
  const [showAuth, setShowAuth] = useState(false);  // ← For modal

  return (
    <>
      {/* Navbar with Login/Logout */}
      <Navbar bg="dark" variant="dark" sticky="top" className="shadow py-3">
        <Container>
          <Link to="/" className="navbar-brand fw-bold fs-4">📚 Indian Bookstore</Link>
          <div className="d-flex align-items-center gap-4">
            {/* Cart Icon */}
            <Link to="/cart" className="text-white position-relative">
              <svg width="30" height="30" fill="white" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L1.01 2H0a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
              {cartCount > 0 && (
                <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                  {cartCount}
                </Badge>
              )}
            </Link>

            {user && user.isAdmin && (
              <Link to="/admin" className="btn btn-warning text-dark fw-bold">
                Admin Panel
              </Link>
            )}

            {/* Wishlist Icon */}
            <Link to="/wishlist" className="text-white position-relative">
              <svg width="30" height="30" fill={wishlist.length > 0 ? "#ff4444" : "white"} viewBox="0 0 16 16">
                <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
              </svg>
              {wishlist.length > 0 && (
                <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                  {wishlist.length}
                </Badge>
              )}
            </Link>

            {/* Login / User Info */}
            {user ? (
              <div className="d-flex align-items-center gap-3 text-white">
                <span>Hello, {user.name || user.email}!</span>
                {user.isAdmin && <Badge bg="warning" text="dark">Admin</Badge>}
                <Button variant="outline-light" size="sm" onClick={logout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Button variant="outline-light" onClick={() => setShowAuth(true)}>
                Login / Register
              </Button>
            )}
          </div>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:id" element={<BookDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>

      {/* Login/Register Modal */}
      <AuthModal show={showAuth} onHide={() => setShowAuth(false)} />

      <footer className="bg-dark text-white text-center py-4 mt-5">
        <Container>
          <p>© 2025 Indian Bookstore • Built with ❤️</p>
        </Container>
      </footer>
    </>
  );
}


export default App;
