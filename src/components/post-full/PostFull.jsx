import React from 'react';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import './PostFull.css';

export default function PostFull() {
  return (
    <div className="post-full">
      <h3>Urban Jungle</h3>
      <Image src="../../../public/sample.jpeg" />
      <div className="my-4">
        <Image roundedCircle="true" src="../../../public/user.jpeg" height="50" className="float-start me-3"/>
        <div>
          <span>by John Smith</span>
          <p className="mb-2 text-muted">[Software Development]</p>
        </div>
      </div>
      <p>
        Some quick example text to build on the card title and make up the
        bulk of the card's content. Some quick example text to build on the card title and make up the
        bulk of the card's content. Some quick example text to build on the card title and make up the
        bulk of the card's content.
      </p>
    </div>
  );
}