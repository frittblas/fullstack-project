import { React, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import './UserListItem.css';

export default function UserListItem({ userData, onSelect }) {

  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleEditUser = async (event) => {
    setShowModal(true);
  };

  const handleSaveChanges = async (event) => {
    if (password === confirmPassword) {
      setPasswordMatch(true)
      console.log(userData);
      console.log("saving...")
      closeModal()
    } else {
      setPasswordMatch(false);
      console.log("no pw match!")
    }
  };

  function closeModal() {
    setShowModal(false)
    setPassword("")
    setConfirmPassword("")
    setPasswordMatch(true)
  }

  return (
    <>
      <tr>
        <td><Form.Check type="checkbox" onChange={() => onSelect(userData._id)} /></td>
        <td><Image roundedCircle="true" src={`/api/users/${userData._id}/image`} height="50" width="50" /></td>
        <td>{`${userData.firstname} ${userData.lastname}`}</td>
        <td>{userData.programTitle}</td>
        <td><Button variant="success" onClick={() => handleEditUser(userData)}>Edit</Button></td>
      </tr>

      <Modal show={showModal} onHide={() => closeModal()}>
        <Modal.Header closeButton>
          <Form.Label className="title">Update user</Form.Label>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formUserName">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder={userData.username} />
          </Form.Group>
          <Form.Group controlId="formFirstName">
            <Form.Label>Firstname</Form.Label>
            <Form.Control type="text" placeholder={userData.firstname} />
          </Form.Group>
          <Form.Group controlId="formLastName">
            <Form.Label>Lastname</Form.Label>
            <Form.Control type="text" placeholder={userData.lastname} />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder={userData.email} />
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => closeModal()}>Cancel</Button>
          <Button variant="success" onClick={() => handleSaveChanges()}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
