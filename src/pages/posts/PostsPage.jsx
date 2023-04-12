import React from 'react';
import PostFull from '../../components/post-full/PostFull';
import CommentForm from '../../components/comment-form/CommentForm';
import Comment from '../../components/comment/Comment';
import ListGroup from 'react-bootstrap/ListGroup';
import './PostsPage.css';

export default function PostsPage() {
  return (
    <div id="post-page">
      <PostFull />
      <CommentForm />
      <ListGroup className="mt-5">
        <Comment />
        <Comment />
        <Comment />
        <Comment />
      </ListGroup>
    </div>
  );
}