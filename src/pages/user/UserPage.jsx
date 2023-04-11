import React from 'react';
import Container from 'react-bootstrap/Container';
import PostForm from '../../components/post-form/PostForm';
import Post from '../../components/post/Post';
import './UserPage.css';

export default function UserPage() {
  return (
    <div>
      <PostForm onPostPosted={data => onPostPostedHandler(data)} />
      <Container className="post-list">
        <Post />
        <Post />
        <Post />
        <Post />
      </Container>
    </div>
  );
}

function onPostPostedHandler(data) {
  console.log(data)
}