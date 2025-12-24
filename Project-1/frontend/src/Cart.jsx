import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext.jsx';

function Cart() {
  const { cart, removeFromCart, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <Container className="my-5 text-center">
        <h2>Your cart is empty</h2>
        <Link to="/" className="btn btn-primary mt-3">Continue Shopping</Link>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h2 className="mb-4">Shopping Cart ({cart.length} items)</h2>
      <Row>
        <Col lg={8}>
          {cart.map(item => (
            <Card className="mb-3" key={item._id}>
              <Row className="g-0">
                <Col md={3}>
                  <Card.Img src={item.image} style={{ height: '150px', objectFit: 'contain' }} />
                </Col>
                <Col md={9}>
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>by {item.author}</Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-bold">Quantity: {item.quantity}</span>
                      <span className="text-success fs-5">₹{item.price * item.quantity}</span>
                      <Button variant="danger" size="sm" onClick={() => removeFromCart(item._id)}>
                        Remove
                      </Button>
                    </div>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          ))}
        </Col>
        <Col lg={4}>
          <Card className="p-4 shadow">
            <h4>Order Summary</h4>
            <hr />
            <div className="d-flex justify-content-between mb-3">
              <span>Total ({cart.length} items)</span>
              <strong>₹{cartTotal}</strong>
            </div>
            <Button variant="success" size="lg" className="w-100">Proceed to Checkout</Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Cart;