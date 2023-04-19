import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation on the form inputs (e.g., check for empty fields)
    if (!username || !password) {
      alert('Please enter a username and password');
      return;
    }

    try {
      // Send HTTP POST request to server
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      // Check response status
      if (response.ok) {
        // Handle success response
        const data = await response.json();
        console.log(data);
      } else {
        // Handle error response
        const errorData = await response.json();
        console.error(errorData);
      }
    } catch (error) {
      console.error(error);
    }

    // Reset form inputs
    setUsername('');
    setPassword('');
  };

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
              type="password"
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