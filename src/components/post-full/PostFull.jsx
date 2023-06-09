import React from 'react';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import './PostFull.css';

export default function PostFull({ postData }) {
  const postDate = new Date(postData.date).toDateString();

  return (
    <div className="post-full">
      <h3>{postData.title}</h3>
      <Image src={`/api/posts/${postData._id}/image`} onError={(event) => event.target.src = '../../../noimage.png'} />
      <div className="my-4">
        <Image roundedCircle="true" src={`/api/users/${postData.author._id}/image`} onError={(event) => event.target.src = '../../../noavatar.png'} height="50" width="50" className="float-start me-3" />
        <div>
          <span>by {`${postData.author.firstname} ${postData.author.lastname}`}</span>
          <p className="mb-2 text-muted">[{postData.author.program}]</p>
        </div>
      </div>
      <p>{postData.message}</p>
      <code>{postDate}</code>
    </div>
  );
}