import { React, useState } from 'react';
import PostFull from '../../components/post-full/PostFull';
import CommentForm from '../../components/comment-form/CommentForm';
import Comment from '../../components/comment/Comment';
import ListGroup from 'react-bootstrap/ListGroup';
import './PostsPage.css';

export default function PostsPage() {
  const [getCommentList, setCommentList] = useState([]);

  return (
    <div id="post-page">
      <PostFull />
      <CommentForm onCommentHandler={replies => setCommentList(replies)}/>
      <ListGroup className="mt-5">
        {getCommentList.map(c => <Comment key={dateToUTStamp(c.date)} comment={c} />)}
      </ListGroup>
    </div>
  );
}

function dateToUTStamp(dateString) {
  return new Date(dateString).getTime().toString();
}