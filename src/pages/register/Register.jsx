import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [program, setProgram] = useState('');
  //programs is temporary before connection with backend
  const [programs, setPrograms] = useState(["none", "it", "economics", "teacher", "iot"])
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Authentication for register
    // Use Petes APIHelper
    console.log(username, firstname, lastname, password, program)
  }

  const handleLogin = () => {
    navigate('/login');
  };

  const generateProgramOptions = (programs) => {
    return programs.map((program) => (
      <option key={program} value={program}>
        {program}
      </option>
    ));
  };

  return (
    <Container className="root-container">
      <Container className="auth-form-container">
        <h2>Register</h2>
        <Form className="register-form" method="POST" onSubmit={handleSubmit}>
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
            <Form.Label>Firstname</Form.Label>
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
              onChange={(e) => setProgram(e.target.value)}>
              {generateProgramOptions(programs)}
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="profilepic">
            <Form.Label>Profile picture</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
          <Button className="auth-btn" type="submit">Register</Button>
        </Form>
        <Button className="link-btn" onClick={handleLogin}>
          Already have an account? Login here.
        </Button>
      </Container>
    </Container>
  );
}