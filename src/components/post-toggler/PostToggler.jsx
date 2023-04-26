import React from 'react';
import { MAIN_POST_THREAD_NAME } from './../../constants.js';
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

const programToggle = (curProgram, userProgram) => curProgram === userProgram ? MAIN_POST_THREAD_NAME : userProgram;