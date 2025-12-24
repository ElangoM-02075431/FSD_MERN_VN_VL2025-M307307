import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext.jsx';

function Wishlist() {
  const { wishlist, toggleWishlist, addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <Container className="my-5 text-center">
        <h2>Your wishlist is empty ❤️</h2>
        <Link to="/" className="btn btn-primary mt-3">Browse Books</Link>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h2 className="mb-4">My Wishlist ({wishlist.length} books)</h2>
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {wishlist.map(book => (
          <Col key={book._id}>
            <Card className="h-100 shadow">
              <div className="text-center p-4 bg-light">
                <Card.Img src={book.image} style={{ height: '300px', objectFit: 'contain' }} />
              </div>
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text className="text-muted">by {book.author}</Card.Text>
                <Card.Text className="text-success fw-bold fs-4">₹{book.price}</Card.Text>
                <Button variant="danger" className="w-100 mb-2" onClick={() => toggleWishlist(book)}>
                  Remove from Wishlist
                </Button>
                <Button variant="success" className="w-100" onClick={() => addToCart(book)}>
                  Add to Cart 🛒
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Wishlist;