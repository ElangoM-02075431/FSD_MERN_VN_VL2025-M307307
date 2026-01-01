import { useState } from 'react';
import { Navbar as BootstrapNavbar, Nav, Form, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext.jsx';
import { useAuth } from '../AuthContext.jsx';
import AuthModal from './AuthModal.jsx';

function AppNavbar() {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

  return (
    <>
      <BootstrapNavbar bg="dark" variant="dark" sticky="top" expand="lg" className="py-3">
        <div className="container-fluid">
          <BootstrapNavbar.Brand as={Link} to="/" className="d-flex align-items-center fw-bold fs-4">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/891/891462.png" 
              alt="Shopez" 
              width="40" 
              height="40" 
              className="me-2"
            />
            Shopez
          </BootstrapNavbar.Brand>

          <BootstrapNavbar.Toggle aria-controls="navbar-content" />

          <BootstrapNavbar.Collapse id="navbar-content">
            <Form className="d-flex mx-auto my-2 my-lg-0" style={{ maxWidth: '500px', width: '100%' }}>
              <Form.Control
                type="search"
                placeholder="Search products..."
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-light">Search</Button>
            </Form>

            <Nav className="ms-auto align-items-center gap-3">
              {user && user.email === 'admin@example.com' && (
                <Nav.Link as={Link} to="/admin" className="text-white fw-bold">
                  Admin Panel
                </Nav.Link>
              )}

              <Nav.Link as={Link} to="/cart" className="position-relative text-white">
                <span className="fs-5">🛒 Cart</span>
                {cartCount > 0 && (
                  <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                    {cartCount}
                  </Badge>
                )}
              </Nav.Link>

              {user ? (
                <div className="d-flex align-items-center gap-2 text-white">
                  <span>Hello, {user.name || user.email.split('@')[0]}!</span>
                  <Button variant="outline-light" size="sm" onClick={logout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <Button variant="outline-light" onClick={() => setShowAuth(true)}>
                  Login / Register
                </Button>
              )}
            </Nav>
          </BootstrapNavbar.Collapse>
        </div>
      </BootstrapNavbar>

      <AuthModal show={showAuth} onHide={() => setShowAuth(false)} />
    </>
  );
}

export default AppNavbar;
