import React from 'react';
import Container from 'react-bootstrap/Container';
import './User.css';
import PostForm from '../../components/post-form/PostForm';
import Post from '../../components/post/Post';

export default function User() {
  return (
    <div>
      <PostForm />
      <Container className="post-list">
        <Post />
        <Post />
      </Container>
    </div>
  );
}
