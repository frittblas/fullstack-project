import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import UserListItem from '../../components/user-list-item/UserListItem';
import './Admin.css';

export default function Admin() {
  return (
    <div>
      <Form.Group className="d-flex">
        <Form.Control type="text" placeholder="Username" />
        <Button variant="success" type="submit">Search</Button>
      </Form.Group>
      <Table responsive className="align-middle user-table">
        <tbody>
          <UserListItem />
          <UserListItem />
          <UserListItem />
        </tbody>
      </Table>
    </div>
  );
}
