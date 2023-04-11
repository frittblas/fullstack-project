import { React, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import PostForm from '../../components/post-form/PostForm';
import Post from '../../components/post/Post';
import { getPosts } from '../../services/api';
import './UserPage.css';

export default function UserPage() {
  const [getPostList, setPostList] = useState([])

  useEffect(() => {
    (async () => {setPostList(await getPosts())})()
  }, []);

  return (
    <div>
      <PostForm onPostPosted={data => setPostList([data].concat(getPostList))} />
      <Container id="post-list">
        {getPostList.map(p => <Post postData={p} />)}
      </Container>
    </div>
  );
}