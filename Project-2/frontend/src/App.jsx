import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <Container className="my-5">
      <h1 className="text-center mb-5">🛒 Shopez - E-Commerce</h1>
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {products.map(product => (
          <Col key={product._id}>
            <Card className="h-100 shadow">
              <Card.Img variant="top" src={product.image} style={{ height: '300px', objectFit: 'contain' }} />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{product.name}</Card.Title>
                <Card.Text className="text-muted">{product.category}</Card.Text>
                <Card.Text className="mt-auto">
                  <strong className="text-success fs-4">₹{product.price}</strong>
                </Card.Text>
                <Button variant="primary">Add to Cart</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
