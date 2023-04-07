import React from 'react';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export default function Comment({id}) {
  return (
    <ListGroup.Item className="p-3">
      <OverlayTrigger
        placement="top"
        overlay={
          <Tooltip>
            <p>John Smith</p>
          </Tooltip>
        }
      >
        <Image roundedCircle="true" src="../../../public/user.jpeg" height="50" className="float-start me-4" />
      </OverlayTrigger>
      <p>
      Cras justo odio, Cras justo odio Cras justo odio Cras justo odio Cras justo odio Cras justo odio
      Cras justo odio, Cras justo odio Cras justo odio Cras justo odio Cras justo odio Cras justo odio
      Cras justo odio, Cras justo odio Cras justo odio Cras justo odio Cras justo odio Cras justo odio
      </p>
    </ListGroup.Item>
  );
}