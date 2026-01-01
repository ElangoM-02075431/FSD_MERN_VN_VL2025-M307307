import { Container, Row, Col, Nav, Form, Button } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-dark text-white py-5 mt-auto">
      <Container>
        <Row>
          <Col md={3} className="mb-4">
            <h5 className="fw-bold mb-3">Shopez</h5>
            <p className="text-light">
              Your one-stop e-commerce platform for shoes, phones, laptops, and more. 
              Shop with confidence in ₹ with high-quality products.
            </p>
          </Col>

          <Col md={3} className="mb-4">
            <h6 className="fw-bold mb-3">Quick Links</h6>
            <Nav className="flex-column">
              <Nav.Link href="/" className="text-light p-0 mb-2">Home</Nav.Link>
              <Nav.Link href="/products" className="text-light p-0 mb-2">Products</Nav.Link>
              <Nav.Link href="/cart" className="text-light p-0 mb-2">Cart</Nav.Link>
              <Nav.Link href="/about" className="text-light p-0 mb-2">About Us</Nav.Link>
              <Nav.Link href="/contact" className="text-light p-0 mb-2">Contact</Nav.Link>
            </Nav>
          </Col>

          <Col md={3} className="mb-4">
            <h6 className="fw-bold mb-3">Customer Service</h6>
            <Nav className="flex-column">
              <Nav.Link href="/help" className="text-light p-0 mb-2">Help & Support</Nav.Link>
              <Nav.Link href="/returns" className="text-light p-0 mb-2">Returns & Refunds</Nav.Link>
              <Nav.Link href="/shipping" className="text-light p-0 mb-2">Shipping Info</Nav.Link>
              <Nav.Link href="/faq" className="text-light p-0 mb-2">FAQ</Nav.Link>
              <Nav.Link href="/privacy" className="text-light p-0 mb-2">Privacy Policy</Nav.Link>
            </Nav>
          </Col>

          <Col md={3} className="mb-4">
            <h6 className="fw-bold mb-3">Newsletter</h6>
            <p className="text-light small">Subscribe to get special offers and updates!</p>
            <Form className="d-flex">
              <Form.Control 
                type="email" 
                placeholder="Your email" 
                className="me-2"
              />
              <Button variant="primary">Subscribe</Button>
            </Form>
            <div className="mt-4">
              <h6 className="fw-bold mb-3">Follow Us</h6>
              <div className="d-flex gap-3">
                <a href="#" className="text-white fs-4"><i className="bi bi-facebook"></i></a>
                <a href="#" className="text-white fs-4"><i className="bi bi-instagram"></i></a>
                <a href="#" className="text-white fs-4"><i className="bi bi-twitter"></i></a>
                <a href="#" className="text-white fs-4"><i className="bi bi-youtube"></i></a>
              </div>
            </div>
          </Col>
        </Row>

        <hr className="my-4 border-secondary" />

        <Row className="text-center">
          <Col>
            <p className="mb-0 small text-light">
              © 2026 Shopez. All rights reserved. Built with ❤️ by Elango M
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
