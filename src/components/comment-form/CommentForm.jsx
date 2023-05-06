import { React, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
import './CommentForm.css';
import { useApi } from '../../hooks/useApi';

export default function CommentForm({onCommentHandler}) {
  const [formValid, setFormValid] = useState(false);
  const { postId } = useParams();
  const api = useApi();

  const onCommentHandlerClb = async () => {
    setFormValid(false);
    return await onComment(api, postId, postCommentMsg);
  }

  return (
    <div id="post-form">
      <Form.Group className="mb-3">
        <Form.Control onChange={() => setFormValid(postCommentMsg.value.length > 0)} id="postCommentMsg" as="textarea" placeholder="I like that idea ..." />
      </Form.Group>
      <Form.Group className="btn-ctl-post mb-1 d-flex justify-content-between">
        <Form.Text className="text-muted">
          What do you think about this ?
        </Form.Text>
        <Button 
          variant="success" 
          type="submit" 
          className="ms-3 rounded" 
          onClick={async () => onCommentHandler(await onCommentHandlerClb())}
          disabled={!formValid}>
          Comment
        </Button>
      </Form.Group>
    </div>
  );
}

async function onComment(api, postId, postCommentMsgObj) {
  const resp = await api.setComment(postId, {message: postCommentMsgObj.value});
  
  if (resp != null) {
    postCommentMsgObj.value = "";
    return resp.replies;
  }
  else {console.error("Failed to submit a comment.")}
}