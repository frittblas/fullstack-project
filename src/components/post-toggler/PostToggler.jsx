import React from 'react';
import './PostToggler.css';
import Form from 'react-bootstrap/Form';

export default function PostToggler() {
  return (
    <div className="post-toggler-wrap">
      <span>All</span>
      <Form.Check
        type="switch"
        id="post-toggler"
      />
      <span>IT</span>
    </div>
  );
}