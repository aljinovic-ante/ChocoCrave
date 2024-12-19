import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import usePostLogin from '../../hooks/auth/usePostLogin';
import '../../css/login.css';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const { postLogin, error } = usePostLogin();
  const location = useLocation();
  const message = location.state?.message;

  const handleLogin = (e) => {
    e.preventDefault();
    postLogin(identifier, password);
  };

  return (
    <div className="login-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <Card>
              <Card.Body>
                <h2 className="text-center">Login</h2>
                {message && <p className="text-danger text-center">{message}</p>}
                <Form onSubmit={handleLogin}>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Email or Username"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  {error && <p className="text-danger">{error}</p>}
                  <div className="d-grid">
                    <Button type="submit">Login</Button>
                  </div>
                </Form>
              </Card.Body>
              <Col md={12}>
                <p className="text-center">
                  Don't have an account? <Link to="/register">Register</Link>
                </p>
              </Col>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginForm;
