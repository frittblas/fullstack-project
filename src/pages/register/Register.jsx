import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import APIHelper from '../../utilities/api-helper';
import { createUser, getPrograms } from '../../services/api';

export default function Register() {
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [programTitle, setProgramTitle] = useState('');
  const [profileImg, setProfileImg] = useState(null);
  const [profileImgPreview, setProfileImgPreview] = useState('');
  const [programsList, setProgramsList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPrograms() {
      try {
        const data = await getPrograms('/api/programs');
        setProgramsList(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPrograms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setPasswordMatch(true);
      const user = {
        firstname,
        lastname,
        username,
        email,
        password,
        programTitle,
        profileImg
      }
      const response = await createUser(user)

      if (response) {
        navigate('/login');
      }

    } else {
      setPasswordMatch(false);
    }
  }

  const handleLogin = () => {
    navigate('/login');
  };

  const generateProgramOptions = (programList) => {
    return programList.map((program) => (
      <option key={program._id} value={program.programTitle}>
        {program.programTitle}
      </option>
    ));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImg(await APIHelper.toBase64(file));
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImgPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
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
              required
            />
          </Form.Group>
          <Form.Group controlId="firstname">
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="lastname">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="lastname"
              placeholder="Last name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
              required
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="******"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {!passwordMatch && (
              <Form.Text className="text-danger">Passwords do not match</Form.Text>
            )}
          </Form.Group>
          <Form.Group controlId="program">
            <Form.Label>Program code</Form.Label>
            <Form.Select
              value={programTitle}
              onChange={(e) => setProgramTitle(e.target.value)}
              required>
              <option value="">None</option>
              {generateProgramOptions(programsList)}
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="profilepic">
            <Form.Label>Profile picture</Form.Label>
            <Form.Control type="file" onChange={handleFileUpload} />
            {profileImgPreview && (
              <div className="profile-pic-preview">
                <img src={profileImgPreview} alt="Profile Picture Preview" />
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