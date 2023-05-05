import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { useApi } from '../../hooks/useApi';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export default function Login() {
  const api = useApi();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();
  const [user, setUser] = useLocalStorage('user', null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await api.loginUser(username, password)
    delete response.password;

    setUser(response);

    setLoginError(response.message);

    if (response.message) {
      if (response.message.includes('username')) {
        setUsername('');
      }
      if (response.message.includes('password')) {
        setPassword('');
      }
    } else {
      navigate('/users');
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <Container className="root-container">
      <Container className="auth-form-container">
        <div className="header-container" style={{ display: "flex", alignItems: "center" }}>
          <img src="/hkr-logo.svg" alt="hkr-logo" style={{ width: "50px", marginRight: "10px" }} />
          <h1 style={{ margin: "0", color: "white" }}>Forum</h1>
        </div>
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
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button className="auth-btn" type="submit">Log In</Button>
          {loginError && (
            <Form.Text className="text-danger">{loginError}</Form.Text>
          )}
        </Form>
        <Button className="link-btn" onClick={handleRegister}>
          Don't have an account? Register here.
        </Button>
      </Container>
    </Container>
  );
}