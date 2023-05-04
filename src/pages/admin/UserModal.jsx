import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function AddUserModal(props) {
  const {
    showModal,
    setShowModal,
    formData,
    setFormData,
    handleAddUser,
  } = props;

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} title="Create new user">
      <Modal.Header closeButton>
        <Modal.Title>Add New User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleAddUser}>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>firstname</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter firstname"
              onChange={(e) =>
                setFormData({ ...formData, firstname: e.target.value })
              }
              value={formData.firstname}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>lastname</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter lastname"
              onChange={(e) =>
                setFormData({ ...formData, lastname: e.target.value })
              }
              value={formData.lastname}
            />
          </Form.Group>

          <Form.Group controlId="formBasicFirstName">
            <Form.Label>username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              value={formData.username}
            />
          </Form.Group>

          <Form.Group controlId="formBasicLastName">
            <Form.Label>email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              value={formData.email}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>password</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              value={formData.password}
            />
          </Form.Group>

          <Form.Group controlId="formBasicProgram">
            <Form.Label>programTitle</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter program"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  programTitle: e.target.value,
                })
              }
              value={formData.programTitle}
            />
          </Form.Group>

          <Form.Group controlId="formBasicRole">
            <Form.Label>profileImg</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image"
              onChange={(e) =>
                setFormData({ ...formData, profileImg: e.target.value })
              }
              value={formData.profileImg}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => handleAddUser()}>
          Create User
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
