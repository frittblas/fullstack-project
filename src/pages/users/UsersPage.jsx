import { React, useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import PostForm from '../../components/post-form/PostForm';
import Post from '../../components/post/Post';
import SearchBar from '../../components/search-bar/SearchBar';
import { useStates } from 'react-easier';
import './UsersPage.css';
import { useApi } from '../../hooks/useApi';

export default function UsersPage() {
  const api = useApi();
  const state = useStates("main");
  const [getMainPostList, setMainPostList] = useState([])
  const [getShownPostList, setShownPostList] = useState([])

  useEffect(() => {
    (async () => {
      resetSearchField();
      const posts = await api.getPosts(state.programMain);
      setMainPostList(posts);
      setShownPostList(posts);
    })();
  }, [state.programMain]);

  return (
    <div>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Post Controls</Accordion.Header>
          <Accordion.Body>
            <PostForm onPostPosted={data => setShownPostList([data].concat(getShownPostList))} />
            <Form.Group className="d-flex">
              <SearchBar 
                onSearch={(e, val) => setShownPostList(getFilteredPosts(getMainPostList, val))}
                onReset={(e, val) => {resetSearchField(); setShownPostList(getMainPostList);}}
                placeholder="Post title..." />
            </Form.Group>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Container id="post-list">
        { getShownPostList ? getShownPostList.map(p => <Post key={p._id} postData={p} />) : ''}
      </Container>
    </div>
  );
}

const resetSearchField = () => {searchBar.value = ''}

const getFilteredPosts = (posts, keyword) => posts.filter(p => p.title.toLowerCase().includes(keyword.toLowerCase()))