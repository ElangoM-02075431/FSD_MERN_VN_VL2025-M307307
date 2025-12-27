import { useState } from 'react';
import axios from 'axios';
import { Navbar, Container, Row, Col, Card, Button, Badge, Form } from 'react-bootstrap';
import { Routes, Route, Link } from 'react-router-dom';
import { useCart } from './CartContext.jsx';
import { useAuth } from './AuthContext.jsx';
import Cart from './Cart.jsx';
import Wishlist from './Wishlist.jsx';
import BookDetail from './BookDetail.jsx';
import AdminPanel from './AdminPanel.jsx';
import AuthModal from './AuthModal.jsx';

function Home({ searchQuery }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        let res;
        if (searchQuery.trim() === '') {
          res = await axios.get('https://bookstore-blrf.onrender.com/api/books');
        } else {
          res = await axios.get(`https://bookstore-blrf.onrender.com/api/books/search?q=${searchQuery}`);
        }
        setBooks(res.data);
      } catch (err) {
        console.error(err);
        setBooks([]);
      }
      setLoading(false);
    };
    fetchBooks();
  }, [searchQuery]);

  return (
    <>
      <div className="bg-dark text-white py-5 text-center">
        <Container>
          <h1 className="display-4 fw-bold">Indian Bookstore</h1>
          <p className="lead">50+ Classic Books • Kafka • Dostoevsky • Ravinder Singh</p>
        </Container>
      </div>

      <Container className="my-5">
        <h2 className="text-center mb-5">
          {searchQuery 
            ? `Results for "${searchQuery}" (${books.length} books found)`
            : `All Books (${books.length} books)`
          }
        </h2>

        {loading && <p className="text-center">Searching...</p>}

        {!loading && books.length === 0 ? (
          <div className="text-center my-5 py-5">
            <h3>No books found for "{searchQuery}"</h3>
            <p className="text-muted">Try "Kafka", "Dostoevsky", "Love Story", or "Romance"</p>
          </div>
        ) : (
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
        )}
      </Container>
    </>
  );
}

function App() {
  const { cartCount, wishlist } = useCart();
  const { user, logout } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [searchInput, setSearchInput] = useState('');   // What user types
  const [searchQuery, setSearchQuery] = useState('');   // What is sent to backend (only on button click)

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput.trim());  // Trigger search only when button clicked
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" sticky="top" className="shadow py-3">
        <Container>
          <Link to="/" className="navbar-brand fw-bold fs-4">📚 Indian Bookstore</Link>

          <Form className="d-flex mx-auto flex-grow-1" style={{ maxWidth: '600px' }} onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Search title, author, genre (e.g. Kafka, Love Story)..."
              className="me-2"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <Button variant="outline-light" type="submit">Search</Button>
          </Form>

          <div className="d-flex align-items-center gap-4">
            <Link to="/wishlist" className="text-white position-relative">
              <svg width="30" height="30" fill={wishlist.length > 0 ? "#ff4444" : "white"} viewBox="0 0 16 16">
                <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
              </svg>
              {wishlist.length > 0 && (
                <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                  {wishlist.length}
                </Badge>
              )}
            </Link>

            <Link to="/cart" className="text-white position-relative">
              <svg width="30" height="30" fill="white" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L1.01 2H0a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
              </svg>
              {cartCount > 0 && (
                <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                  {cartCount}
                </Badge>
              )}
            </Link>

            {user ? (
              <div className="d-flex align-items-center gap-3 text-white">
                <span>Hello, {user.name || user.email}!</span>
                {user.isAdmin && <Badge bg="warning" text="dark">Admin</Badge>}
                <Button variant="outline-light" size="sm" onClick={logout}>Logout</Button>
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
        <Route path="/" element={<Home searchQuery={searchQuery} />} />
        <Route path="/book/:id" element={<BookDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        {user && user.isAdmin && <Route path="/admin" element={<AdminPanel />} />}
      </Routes>

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
