import React from 'react';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { Link } from "react-router-dom";
import './Post.css';

export default function Post() {
  return (
    <Card className="post">
      <Card.Body>
        <Link to='post/id'>
          <Image fluid="true" src="../../../public/sample.jpeg" />
        </Link>
        <Image roundedCircle="true" src="../../../public/user.jpeg" height="50" />
        <Link to='post/id'>
          <Card.Title>Urban Jungle</Card.Title>
        </Link>
        <Card.Subtitle className="mb-2 text-muted">by John Smith</Card.Subtitle>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content. Some quick example text to build on the card title and make up the
          bulk of the card's content. Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
  );
}