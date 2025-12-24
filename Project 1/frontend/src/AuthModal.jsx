import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useAuth } from './AuthContext.jsx';

function AuthModal({ show, onHide }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
      onHide();
    } catch (err) {
      alert('Error: ' + err.response?.data?.message || 'Failed');
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{isLogin ? 'Login' : 'Register'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {!isLogin && (
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control value={name} onChange={(e) => setName(e.target.value)} required />
            </Form.Group>
          )}
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Form.Group>
          <Button type="submit" className="w-100">
            {isLogin ? 'Login' : 'Register'}
          </Button>
        </Form>
        <p className="text-center mt-3">
          {isLogin ? "Don't have account? " : "Have account? "}
          <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Register' : 'Login'}
          </Button>
        </p>
      </Modal.Body>
    </Modal>
  );
}

export default AuthModal;