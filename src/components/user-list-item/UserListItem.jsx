import { React, Fragment } from 'react';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';

export default function UserListItem({userData}) {
  return (
      <tr>
        <td><Image roundedCircle="true" src={`/api/users/${userData._id}/image`} height="50" /></td>
        <td>{`${userData.firstname} ${userData.lastname}`}</td>
        <td>{userData.program}</td>
      </tr>
  );
}
