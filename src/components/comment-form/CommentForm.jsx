import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './CommentForm.css';

export default function CommentForm() {
  return (
    <Form id="post-form" method="POST">
      <Form.Group className="mb-3">
        <Form.Control as="textarea" placeholder="I like that idea ..." />
      </Form.Group>
      <Form.Group className="btn-ctl-post mb-1 d-flex justify-content-between">
        <Form.Text className="text-muted">
          What do you think about this ?
        </Form.Text>
        <Button variant="success" type="submit" className="ms-3">Comment</Button>
      </Form.Group>
    </Form>
  );
}