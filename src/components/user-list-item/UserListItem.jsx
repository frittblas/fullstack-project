import React from 'react';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';

export default function UserListItem() {
  return (
    <tr>
      <td><Image roundedCircle="true" src="../../../public/user.jpeg" height="50" /></td>
      <td>John Smith</td>
      <td>Software Development</td>
    </tr>
  );
}
