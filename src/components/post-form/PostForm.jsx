import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import APIHelper from '../../utilities/api-helper';
import { setPost } from '../../services/api';
import './PostForm.css';

let onPostPostedHook;

export default function PostForm({onPostPosted}) {
  onPostPostedHook = onPostPosted;
  
  return (
    <Form id="post-form" method="POST" onSubmit={onPostSubmit}>
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

async function onPostSubmit(event) {
  event.preventDefault();
  const file = event.target[1].files[0];
  const postData = {};

  postData.author = "someUsername"
  postData.message = event.target[0].value;
  postData.program = "Software Development";

  if (file) {
    postData.image = await APIHelper.toBase64(file);
  }

  const respData = await setPost(postData);

  if (respData != null) {
    onPostPostedHook(respData)
  }
}