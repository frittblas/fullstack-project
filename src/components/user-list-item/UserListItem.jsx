import { React, useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import './UserListItem.css';
import { useApi } from '../../hooks/useApi';

export default function UserListItem({ userData, onSelect }) {

  const api = useApi();
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (password === confirmPassword && password.length >= 6 || password.length === 0) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [username, firstname, lastname, email, password, confirmPassword]);

  const updatedUser = {
    username: username,
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: password
  };

  const handleEditUser = async (event) => {
    setShowModal(true);
  };

  const handleSaveChanges = async (event) => {
    if (password === confirmPassword) {
      setPasswordMatch(true)

      Object.keys(updatedUser).forEach(key => {
        if (updatedUser[key] === '') {
          delete updatedUser[key];
        }
      });

      console.log("changes: " + updatedUser);
      const resp = await api.updateUser(userData.username, updatedUser)
      window.location.reload();
    } else {
      setPasswordMatch(false);
      console.log("no pw match!")
    }
  };

  function closeModal() {
    setUsername("");
    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setShowModal(false)
  }

  return (
    <>
      <tr>
        <td><Form.Check type="checkbox" onChange={() => onSelect(userData._id)} /></td>
        <td><Image roundedCircle="true" src={`/api/users/${userData._id}/image`} onError={(event) => event.target.src = '../../../noavatar.png'} height="50" width="50" /></td>
        <td>{`${userData.firstname} ${userData.lastname}`}</td>
        <td>{userData.programTitle}</td>
        <td><Button className="rounded new-user-btn btn-light-green" variant="success" onClick={() => handleEditUser(userData)}>Edit</Button></td>
      </tr>

      <Modal show={showModal} onHide={() => closeModal()}>
        <Modal.Header closeButton>
          <Modal.Title>Update user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formUserName">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder={userData.username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formFirstName">
            <Form.Label>Firstname</Form.Label>
            <Form.Control
              type="text"
              placeholder={userData.firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formLastName">
            <Form.Label>Lastname</Form.Label>
            <Form.Control
              type="text"
              placeholder={userData.lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder={userData.email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length > 0}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid email address.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="min 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              isInvalid={password.length > 0 && password.length < 6}
            />
            <Form.Control.Feedback type="invalid">
              Password must be at least 6 characters long
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="******"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              minLength={6}
              isInvalid={confirmPassword.length > 0 && confirmPassword.length < 6 || confirmPassword !== password}
            />
            <Form.Control.Feedback type="invalid">
              Passwords do not match
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" className="rounded new-user-btn btn-light-green" onClick={() => closeModal()}>Cancel</Button>
          <Button variant="success" className="rounded new-user-btn btn-light-green" onClick={() => handleSaveChanges()} disabled={!formValid}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
