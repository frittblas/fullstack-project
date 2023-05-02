import { React } from 'react';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import { Button } from 'react-bootstrap';

export default function UserListItem({ userData, onSelect }) {

  const handleEdit = async (event) => {
    console.log(userData);
  };

  return (
    <tr>
      <td><Form.Check type="checkbox" onChange={() => onSelect(userData._id)} /></td>
      <td><Image roundedCircle="true" src={`/api/users/${userData._id}/image`} height="50" width="50" /></td>
      <td>{`${userData.firstname} ${userData.lastname}`}</td>
      <td>{userData.programTitle}</td>
      <td><Button variant="success" onClick={() => handleEdit(userData)}>Edit</Button></td>
    </tr>
  );
}
