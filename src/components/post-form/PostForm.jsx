import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { MAIN_POST_THREAD_NAME } from './../../constants.js';
import APIHelper from '../../utilities/api-helper';
import { setPost } from '../../services/api';
import { useStates } from 'react-easier';
import './PostForm.css';

let onPostPostedHook;

export default function PostForm({onPostPosted}) {
  const state = useStates("main");
  onPostPostedHook = onPostPosted;
  
  return (
    <Form id="post-form" method="POST" onSubmit={e => onPostSubmit(e, state.program)}>
      <Form.Group className="mb-3">
        <Form.Control type="input" placeholder="The Big Title" />
      </Form.Group>
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

async function onPostSubmit(event, program) {
  event.preventDefault();
  const file = event.target[2].files[0];
  const postData = {};

  postData.title = event.target[0].value;
  postData.message = event.target[1].value;

  if (file) {
    postData.image = await APIHelper.toBase64(file);
  }

  const respData = await setPost(postData, program === MAIN_POST_THREAD_NAME);

  if (respData != null) {
    onPostPostedHook(respData)
  }
}