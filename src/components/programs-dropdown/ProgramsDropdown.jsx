import React from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useStates } from 'react-easier';
import './ProgramsDropdown.css';

export default function ProgramsDropdown() {
  const state = useStates('main');
  return (
      <Form.Group className="programs-select" onChange={event => {state.program = event.target.value;}}>
        <span>Programs:</span>
        <Form.Select>
          <option value="All">All</option>
          <option value="Software Development">Software Development</option>
          <option value="Bio-Medicine">Bio-Medicine</option>
          <option value="Economics">Economics</option>
        </Form.Select>
      </Form.Group>
  );
}