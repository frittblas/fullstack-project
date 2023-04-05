import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './PostForm.css';

export default function PostForm() {
  return (
    <Form id="post-form" method="POST">
      <Form.Group className="mb-3">
        <Form.Control as="textarea" placeholder="..." />
        <Form.Text className="text-muted">
          Let us know what is on your mind.
        </Form.Text>
      </Form.Group>
      <Form.Group className="btn-ctl-post mb-1 d-flex">
        <Form.Control type="file" />
        <Button variant="success" type="submit" className="ms-3">Post</Button>
      </Form.Group>
    </Form>
  );
}