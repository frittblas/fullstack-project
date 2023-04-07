import React from 'react';
import PostFull from '../../components/post-full/PostFull';
import CommentForm from '../../components/comment-form/CommentForm';
import Comment from '../../components/comment/Comment';
import ListGroup from 'react-bootstrap/ListGroup';
import './PostPage.css';

export default function PostPage() {
  return (
    <div id="post-page">
      <PostFull />
      <CommentForm />
      <ListGroup className="mt-5">
        <Comment />
        <Comment />
      </ListGroup>
    </div>
  );
}