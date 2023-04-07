import React from 'react';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';

export default function Comment() {
  return (
    <ListGroup.Item className="p-3">
      <Image roundedCircle="true" src="../../../public/user.jpeg" height="50" className="float-start me-4" />
      <p>
      Cras justo odio, Cras justo odio Cras justo odio Cras justo odio Cras justo odio Cras justo odio
      Cras justo odio, Cras justo odio Cras justo odio Cras justo odio Cras justo odio Cras justo odio
      Cras justo odio, Cras justo odio Cras justo odio Cras justo odio Cras justo odio Cras justo odio
      </p>
    </ListGroup.Item>
  );
}