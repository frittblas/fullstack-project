import { React, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import PostForm from '../../components/post-form/PostForm';
import Post from '../../components/post/Post';
import { getPosts } from '../../services/api';
import { useStates } from 'react-easier';
import './UsersPage.css';

export default function UsersPage() {
  const state = useStates("main");
  const [getPostList, setPostList] = useState([])

  useEffect(() => {
    (async () => {setPostList(await getPosts())})()
  }, []);

  return (
    <div>
      <PostForm onPostPosted={data => setPostList([data].concat(getPostList))} />
      <Container id="post-list">
        {
          state.program === 'All' ? 
          getPostList.map(p => <Post key={p._id} postData={p} />) :
          getPostList.filter(p => p.program === state.program).map(p => <Post key={p._id} postData={p} />)
        }
      </Container>
    </div>
  );
}