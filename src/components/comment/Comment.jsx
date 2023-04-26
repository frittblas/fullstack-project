import React from 'react';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import './Comment.css';

export default function Comment({comment}) {
  return (
    <ListGroup.Item className="p-3">
      <OverlayTrigger
        placement="top"
        overlay={
          <Tooltip>
            <p>{comment.author}</p>
          </Tooltip>
        }
      >
        <Image roundedCircle="true" src={`/api/users/${postData.author._id}/image`} height="50" className="float-start me-4" />
      </OverlayTrigger>
      <p>{comment.reply}</p>
    </ListGroup.Item>
  );
}