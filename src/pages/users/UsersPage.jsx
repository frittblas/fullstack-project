import { React, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import PostForm from '../../components/post-form/PostForm';
import Post from '../../components/post/Post';
import { useStates } from 'react-easier';
import './UsersPage.css';
import { useApi } from '../../hooks/useApi';

export default function UsersPage() {
  const api = useApi();
  const state = useStates("main");
  const [getPostList, setPostList] = useState([])

  useEffect(() => {
    (async () => setPostList(await api.getPosts(state.programMain)))();
  }, [state.programMain]);

  return (
    <div>
      <PostForm onPostPosted={data => setPostList([data].concat(getPostList))} />
      <Container id="post-list">
        { getPostList ? getPostList.map(p => <Post key={p._id} postData={p} />) : ''}
      </Container>
    </div>
  );
}