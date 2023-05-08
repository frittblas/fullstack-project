import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import APIHelper from '../../utilities/api-helper';
import AvatarSelector from '../../components/avatar-selector/AvatarSelector';
import { useApi } from '../../hooks/useApi';

export default function Register() {
  const api = useApi();
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registrationError, setRegistrationError] = useState(null);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [programTitle, setProgramTitle] = useState('');
  const [profileImg, setProfileImg] = useState(null);
  const [profileImgPreview, setProfileImgPreview] = useState('');
  const [programsList, setProgramsList] = useState([]);
  const [showAvatarSelect, setShowAvatarSelect] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPrograms() {
      try {
        const data = await api.getPrograms('/api/programs');
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
      const response = await api.createUser(user)

      if (response.message == null) {
        navigate('/login');
      } else {
        setRegistrationError(response.message);
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

  return (
    <Container className="root-container">
      <Container className="auth-form-container">
        <h1 style={{ color: "white" }}>Register</h1>
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
          <Form.Group className="profilepic" controlId="profilepic">
            {profileImgPreview && (
              <div className="profile-pic-preview">
                <img src={profileImgPreview} alt="Profile Picture Preview" />
              </div>
            )}
            <Button variant="success" className="rounded btn-small" onClick={() => setShowAvatarSelect(true)}>
              Choose profile pic
            </Button>
          </Form.Group>
          <Button variant="success" className="auth-btn" type="submit">Register</Button>
          {registrationError && (
            <Form.Text className="text-danger">{registrationError}</Form.Text>
          )}
        </Form>
        <Button className="link-btn" onClick={handleLogin}>
          Already have an account? Login here.
        </Button>
      </Container>
      <AvatarSelector 
        handleCrop={img => {
          const imgRaw = APIHelper.removePreDataFromBase64(img);
          setProfileImg(imgRaw);
          setProfileImgPreview(img);
        }}
        handleClose={() => {
          setShowAvatarSelect(false);
        }}
        handleCancel={() => {
          setProfileImg(null);
          setProfileImgPreview(null);
        }}
        showAvatarSelect={showAvatarSelect} />
    </Container>
  );
}