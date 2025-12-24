import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios.get(`https://bookstore-blrf.onrender.com/api/books/${id}`)
      .then(res => setBook(res.data))
      .catch(err => console.log(err));
  }, [id]);

  if (!book) return <h2 className="text-center my-5">Loading...</h2>;

  return (
    <Container className="my-5">
      <Link to="/" className="btn btn-secondary mb-4">← Back to Home</Link>
      <Row className="g-5">
        <Col md={5}>
          <Card className="border-0 shadow">
            <Card.Img 
              src={book.image} 
              alt={book.title}
              style={{ height: '500px', objectFit: 'contain' }}
            />
          </Card>
        </Col>
        <Col md={7}>
          <Badge bg="info" className="mb-3">{book.genre}</Badge>
          <h1 className="fw-bold">{book.title}</h1>
          <p className="text-muted fs-4">by {book.author}</p>
          <div className="my-4">
            <span className="text-warning fs-3">★★★★★</span>
            <span className="ms-3 text-muted">4.8 (245 reviews)</span>
          </div>
          <h2 className="text-primary fw-bold mb-4">₹{book.price}</h2>
          <Button variant="success" size="lg" className="mb-4">Add to Cart 🛒</Button>
          <hr />
          <h4>Description</h4>
          <p className="lead">{book.description}</p>
          <div className="mt-5">
            <h4>Customer Reviews</h4>
            <Card className="p-3 mb-3">
              <p>"A masterpiece! Kafka's best work." - Rajesh K.</p>
              <span className="text-warning">★★★★★</span>
            </Card>
            <Card className="p-3">
              <p>"Deep and thought-provoking." - Priya S.</p>
              <span className="text-warning">★★★★☆</span>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
}


export default BookDetail;

