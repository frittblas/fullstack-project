import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Authentication for login
    console.log(username, password)
  }

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <Container className="root-container">
      <Container className="auth-form-container">
        <h2>Login</h2>
        <Form className="login-form" onSubmit={handleSubmit}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="new-password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button className="auth-btn" type="submit">Log In</Button>
        </Form>
        <Button className="link-btn" onClick={handleRegister}>
          Don't have an account? Register here.
        </Button>
      </Container>
    </Container>
  );
}