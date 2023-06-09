import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostFull from '../../components/post-full/PostFull';
import CommentForm from '../../components/comment-form/CommentForm';
import Comment from '../../components/comment/Comment';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import './PostsPage.css';
import { useApi } from '../../hooks/useApi';

export default function PostsPage() {
  const [isInitLoad, setInitLoad] = useState(true);
  const [getPostData, setPostData] = useState([]);
  const postId = useParams().postId;

  const api = useApi();

  useEffect(() => {
    (async () => {
      setPostData(await api.getPost(postId))
      setInitLoad(false);
    })(postId)
  }, []);

  return (
    <div id="post-page">
      {
        isInitLoad ?
        <div className="spinner-wrap"><Spinner animation="border" /></div> :
        <div>
          <PostFull postData={getPostData} />
          <CommentForm onCommentHandler={replies => setPostData({...getPostData, replies: replies})}/>
          <ListGroup className="mt-5">
            {getPostData.replies.map(c => <Comment key={dateToUTStamp(c.date)} comment={c} />)}
          </ListGroup>
        </div>
      }
    </div>
  );
}

function dateToUTStamp(dateString) {
  return new Date(dateString).getTime().toString();
}