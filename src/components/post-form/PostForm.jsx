import { React, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import APIHelper from '../../utilities/api-helper';
import { useStates } from 'react-easier';
import './PostForm.css';
import { useApi } from '../../hooks/useApi';

let onPostPostedHook;

export default function PostForm({ onPostPosted }) {
  const api = useApi();
  const state = useStates("main");
  onPostPostedHook = onPostPosted;

  return (
    <Form id="post-form" method="POST" onSubmit={e => onPostSubmit(e, api, state.programMain)}>
      <Form.Group className="mb-3" controlId="validationPostTitle">
        <Form.Control type="input" placeholder="The Big Title" required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control as="textarea" placeholder="..." required />
        <Form.Text className="text-muted">
          Let us know what is on your mind.
        </Form.Text>
      </Form.Group>
      <Form.Group className="btn-ctl-post mb-1 d-flex">
        <Form.Control type="file" />
        <Button variant="success" type="submit" className="ms-3 rounded">Post</Button>
      </Form.Group>
    </Form>
  );
}

async function onPostSubmit(event, api, programMain) {
  event.preventDefault();
  const file = event.target[2].files[0];
  const postData = {};

  postData.title = event.target[0].value;
  postData.message = event.target[1].value;

  if (file) {
    postData.image = await APIHelper.toBase64(file);
  }

  const respData = await api.setPost(postData, programMain);

  if (respData != null) {
    onPostPostedHook(respData)
  }

  event.target[0].value = '';
  event.target[1].value = '';
  event.target[2].value = '';
}