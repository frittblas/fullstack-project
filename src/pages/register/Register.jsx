import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [program, setProgram] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Authentication for register
    console.log(username, firstname, lastname, password, program)
  }

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <Container className="auth-form-container">
      <h2>Register</h2>
      <Form className="register-form" onSubmit={handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="firstname">
          <Form.Label>First name</Form.Label>
          <Form.Control
            type="text"
            placeholder="First Name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="lastname">
          <Form.Label>Lastname</Form.Label>
          <Form.Control
            type="lastname"
            placeholder="Lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="current-password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="program">
          <Form.Label>Program code</Form.Label>
          <Form.Select
            value={program}
            onChange={(e) => setProgram(e.target.value)}
          >
            <option value="">Select a program</option>
            <option value="it">IT</option>
            <option value="economics">Economics</option>
            <option value="teacher">Teacher</option>
          </Form.Select>
        </Form.Group>
        <Button type="submit">Register</Button>
      </Form>
      <Button className="link-btn" onClick={handleLogin}>
        Already have an account? Login here.
      </Button>
    </Container>
  );
}