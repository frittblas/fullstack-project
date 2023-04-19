import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { setComment } from '../../services/api';
import { useParams } from 'react-router-dom';
import './CommentForm.css';

export default function CommentForm({onCommentHandler}) {
  const { postId } = useParams();

  return (
    <div id="post-form" method="POST">
      <Form.Group className="mb-3">
        <Form.Control id="postCommentMsg" as="textarea" placeholder="I like that idea ..." />
      </Form.Group>
      <Form.Group className="btn-ctl-post mb-1 d-flex justify-content-between">
        <Form.Text className="text-muted">
          What do you think about this ?
        </Form.Text>
        <Button 
          variant="success" 
          type="submit" 
          className="ms-3" 
          onClick={async () => onCommentHandler(await onComment(postId, postCommentMsg.value))}>
          Comment
        </Button>
      </Form.Group>
    </div>
  );
}

async function onComment(postId, comment) {
  const data = {author: "Justin Timberlake", message: comment}
  const resp = await setComment(postId, data);
  
  if (resp != null) return resp.replies;
  else {console.error("Failed to submit a comment.")}
}