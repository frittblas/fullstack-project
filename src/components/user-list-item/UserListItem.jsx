import { React } from 'react';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';

export default function UserListItem({userData, onSelect}) {
  return (
      <tr>
        <td><Form.Check type="checkbox" onChange={() => onSelect(userData._id)} /></td>
        <td><Image roundedCircle="true" src={`/api/users/${userData._id}/image`} height="50" /></td>
        <td>{`${userData.firstname} ${userData.lastname}`}</td>
        <td>{userData.programTitle}</td>
      </tr>
  );
}
