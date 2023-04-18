import React from 'react';
import './PostToggler.css';
import Form from 'react-bootstrap/Form';
import { useStates } from 'react-easier';

export default function PostToggler() {
  const state = useStates("main");

  return (
    <div className="post-toggler-wrap">
      <span>All</span>
      <Form.Check
        type="switch"
        id="post-toggler"
        onClick={() => state.program = programToggle(state.program, 'Economics')}
      />
      <span>IT</span>
    </div>
  );
}

const programToggle = (curProgram, userProgram) => curProgram === userProgram ? 'All' : userProgram;