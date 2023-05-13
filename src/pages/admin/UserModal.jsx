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

  const programTitles = [
    'Software Development',
    'Economics',
    'IOT Engineers',
    'Business Administration',
    'Digital Design',
    'Food and Meal Science'
  ];

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} title="Create new user">
      <Modal.Header closeButton>
        <Modal.Title>Add New User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleAddUser}>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              onChange={(e) =>
                setFormData({ ...formData, firstname: e.target.value })
              }
              value={formData.firstname}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              onChange={(e) =>
                setFormData({ ...formData, lastname: e.target.value })
              }
              value={formData.lastname}
            />
          </Form.Group>

          <Form.Group controlId="formBasicFirstName">
            <Form.Label>Username</Form.Label>
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
            <Form.Label>Email</Form.Label>
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
            <Form.Label>Password</Form.Label>
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
            <Form.Label>Program Title</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) =>
                setFormData({ ...formData, programTitle: e.target.value })
              }
              value={formData.programTitle}
            >
              <option disabled selected value="">
                Choose a program title
              </option>
              {programTitles.map((title) => (
                <option key={title}>
                  {title}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" className="rounded" onClick={() => setShowModal(false)}>
          Cancel
        </Button>
        <Button variant="success" className="rounded new-user-btn btn-light-green" onClick={() => handleAddUser()}>
          Create User
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
