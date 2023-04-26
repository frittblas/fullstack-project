import React from 'react';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { Link } from "react-router-dom";
import './Post.css';

export default function Post({postData}) {
  return (
    <Card className="post">
      <Card.Body>
        <Link to={`/posts/${postData._id}`}>
          <Image fluid="true" src={`/api/posts/${postData._id}/image`} />
        </Link>
        <Image roundedCircle="true" src="../../../public/user.jpeg" height="50" />
        <Link to={`/posts/${postData._id}`}>
          <Card.Title>{postData.title}</Card.Title>
        </Link>
        <Card.Subtitle className="mb-2 text-muted">by {postData.author}</Card.Subtitle>
        <Card.Text>
          {postData.message}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}