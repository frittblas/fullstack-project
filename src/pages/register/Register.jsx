import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import APIHelper from '../../utilities/api-helper';

export default function Register() {
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [program, setProgram] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState('');
  //programs is temporary before connection with backend
  const [programs, setPrograms] = useState(["none", "it", "economics", "teacher", "iot"])
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Authentication for register
    // Use Petes APIHelper
    if (password === confirmPassword) {
      setPasswordMatch(true);
      console.log(username, firstname, lastname, password, program)
    } else {
      setPasswordMatch(false);
    }
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

  // Function to handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);

    // Preview the image using FileReader
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePicPreview(reader.result);
    };
    reader.readAsDataURL(file);
  }

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
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="lastname">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="lastname"
              placeholder="Last name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="min 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="******"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {!passwordMatch && (
              <Form.Text className="text-danger">Passwords do not match</Form.Text>
            )}
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
            <Form.Control type="file" onChange={handleFileUpload} />
            {profilePicPreview && (
              <div className="profile-pic-preview">
                <img src={profilePicPreview} alt="Profile Picture Preview" />
              </div>
            )}
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