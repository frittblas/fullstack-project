import React from 'react';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import './PostFull.css';

export default function PostFull({postData}) {
  return (
    <div className="post-full">
      <h3>{postData.title}</h3>
      <Image src={`/api/users/${postData._id}/image`} />
      <div className="my-4">
        <Image roundedCircle="true" src={`/api/users/${postData.author._id}/image`} height="50" className="float-start me-3"/>
        <div>
          <span>by {`${postData.author.firstname} ${postData.author.lastname}`}</span>
          <p className="mb-2 text-muted">[{postData.author.programTitle}]</p>
        </div>
      </div>
      <p>{postData.message}</p>
    </div>
  );
}