import { React, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import PostForm from '../../components/post-form/PostForm';
import Post from '../../components/post/Post';
import { getPosts, getProgramPosts } from '../../services/api';
import { useStates } from 'react-easier';
import { MAIN_POST_THREAD_NAME } from './../../constants.js';
import './UsersPage.css';

export default function UsersPage() {
  const state = useStates("main");
  const [getPostList, setPostList] = useState([])

  useEffect(() => {
    if (state.program === MAIN_POST_THREAD_NAME) { (async () => {setPostList(await getPosts())})() }
    else { (async () => {setPostList(await getProgramPosts())})() }
  }, [state.program]);

  return (
    <div>
      <PostForm onPostPosted={data => setPostList([data].concat(getPostList))} />
      <Container id="post-list">
        { getPostList ? getPostList.map(p => <Post key={p._id} postData={p} />) : ''}
      </Container>
    </div>
  );
}