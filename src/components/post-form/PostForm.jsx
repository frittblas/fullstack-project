import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './PostForm.css';

export default function PostForm() {
  return (
    <Form id="post-form" method="POST" onSubmit={onPostSubmit}>
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
    postData.image = await toBase64(file);
  }

  console.log(postData);
}

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => { 
      const fileData = {name: file.name, type: file.type, size: file.size};
      const fcontents = e.target.result;
      const b64Encoded = fcontents.slice(fcontents.indexOf('base64,') + 7);
      fileData.contents = b64Encoded;
      resolve(fileData);
    };
    reader.onerror = e => reject(e);
    reader.readAsDataURL(file);
  });
}