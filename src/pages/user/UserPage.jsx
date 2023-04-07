import React from 'react';
import Container from 'react-bootstrap/Container';
import PostForm from '../../components/post-form/PostForm';
import Post from '../../components/post/Post';
import './UserPage.css';

export default function UserPage() {
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
