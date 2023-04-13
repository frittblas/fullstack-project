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
          <option key="all" value="All">All</option>
          {state.programsList.map(p => <option key={p._id} value={p.programTitle}>{p.programTitle}</option>)}
        </Form.Select>
      </Form.Group>
  );
}