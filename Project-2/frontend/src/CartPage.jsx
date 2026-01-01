import { Container, Row, Col, ListGroup, Button, Card } from 'react-bootstrap';
import { useCart } from './CartContext.jsx';
import { Link } from 'react-router-dom';

function CartPage() {
  const { cart, addToCart, decreaseQuantity, removeFromCart, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <Container className="my-5 text-center">
        <h2>Your Cart is Empty</h2>
        <Link to="/" className="btn btn-primary mt-4">Continue Shopping</Link>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h1 className="mb-5">Your Shopping Cart</h1>
      <Row>
        <Col lg={8}>
          <ListGroup variant="flush">
            {cart.map(item => (
              <ListGroup.Item key={item._id} className="d-flex align-items-center py-4">
                <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'contain', marginRight: '20px' }} />
                <div className="flex-grow-1">
                  <h5>{item.name}</h5>
                  <p className="text-muted mb-1">{item.category}</p>
                  <p className="fw-bold text-success">₹{item.price}</p>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <Button size="sm" variant="outline-secondary" onClick={() => decreaseQuantity(item._id)}>-</Button>
                  <span className="fw-bold fs-5">{item.quantity}</span>
                  <Button size="sm" variant="outline-secondary" onClick={() => addToCart(item)}>+</Button>
                  <Button variant="danger" size="sm" onClick={() => removeFromCart(item._id)}>Remove</Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col lg={4}>
          <Card className="shadow">
            <Card.Body>
              <Card.Title className="fs-3">Order Summary</Card.Title>
              <hr />
              <div className="d-flex justify-content-between fs-4">
                <span>Total:</span>
                <strong className="text-success">₹{cartTotal}</strong>
              </div>
              <Button variant="success" size="lg" className="w-100 mt-4">
                Proceed to Checkout
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CartPage;
