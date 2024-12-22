import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import usePostRegister from '../../hooks/auth/usePostRegister';
import '../../css/register.css';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const { postRegister, error } = usePostRegister();
  const [ passError, setPassError ] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      setPassError('Passwords do not match');
      return;
    }

    postRegister(username, email, password);
  };

  return (
    <div className="register-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={12}>
            <Card>
              <Card.Body>
                <div className="text-center mb-4">
                  <h1>Create an account</h1>
                </div>
                <Form onSubmit={handleRegister}>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="password"
                      placeholder="Repeat Password"
                      value={repeatPassword}
                      onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                  </Form.Group>
                  {error && <p style={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}>{error}</p>}
                  {passError && <p style={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}>{passError}</p>}
                  <div className="d-grid gap-2">
                    <Button type="submit" style={{ color: 'white' }}>Register</Button>
                  </div>
                </Form>
              </Card.Body>
              <Col md={12}>
                <p className="text-center">
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </Col>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterForm;