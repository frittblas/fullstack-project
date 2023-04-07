import React from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function SelectSizesExample() {
  return (
      <Form.Group as={Row} className="programs-select">
        <Form.Label column xs="3">
          Programs:
        </Form.Label>
        <Col>
          <Form.Select>
            <option value="0">All</option>
            <option value="1">Software Development</option>
            <option value="2">Bio Medicine</option>
            <option value="3">Economics</option>
          </Form.Select>
        </Col>
      </Form.Group>
  );
}