import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { useCart } from './CartContext.jsx';
import { Link } from 'react-router-dom';

function CartPage() {
  const { cart, removeFromCart, addToCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <Container className="my-5 text-center">
        <h2>Your Cart is Empty</h2>
        <Link to="/" className="btn btn-primary mt-3">Continue Shopping</Link>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h1 className="mb-4">Your Cart</h1>
      <Row>
        <Col lg={8}>
          <ListGroup>
            {cart.map(item => (
              <ListGroup.Item key={item._id} className="d-flex align-items-center">
                <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'contain', marginRight: '20px' }} />
                <div className="flex-grow-1">
                  <h5>{item.name}</h5>
                  <p className="text-muted mb-0">₹{item.price} × {item.quantity}</p>
                </div>
                <div>
                  <Button size="sm" onClick={() => addToCart(item)}>+</Button>
                  <span className="mx-2">{item.quantity}</span>
                  <Button size="sm" variant="outline-secondary" onClick={() => removeFromCart(item._id)}>-</Button>
                  <Button variant="danger" size="sm" className="ms-3" onClick={() => removeFromCart(item._id)}>Remove</Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col lg={4}>
          <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <h4>Total: ₹{total}</h4>
              <Button variant="success" size="lg" className="w-100 mt-3">Proceed to Checkout</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CartPage;
