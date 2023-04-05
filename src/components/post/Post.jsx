import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import './Post.css';

export default function Post() {
  return (
    <Card className="post">
      <Card.Img variant="top" src="../../../public/sample.jpeg" />
      <Card.Body>
        <Image roundedCircle="true" src="../../../public/user.jpeg" height="50" />
        <Card.Title>Urban Jungle</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content. Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
  );
}