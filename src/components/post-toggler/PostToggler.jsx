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
        readOnly={true}
        type="switch"
        id="post-toggler"
        checked={!state.programMain}
        onClick={() => state.programMain = !state.programMain}
      />
      <span>IT</span>
    </div>
  );
}