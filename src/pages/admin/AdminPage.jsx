import { React, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import UserListItem from '../../components/user-list-item/UserListItem';
import { getUsers } from '../../services/api';
import { useStates } from 'react-easier';
import './AdminPage.css';

// store all users here:
const tmpUsers = [
  {_id: 1, firstname: "John", lastname: "Smith", username: "jsmith01", program: "Software Development"},
  {_id: 2, firstname: "Pancho", lastname: "Rodrigues", username: "pjfiiiii011", program: "Economics"},
  {_id: 3, firstname: "Ganzano", lastname: "Allbertino", username: "ganzzzaaaa", program: "Economics"},
  {_id: 4, firstname: "Michael", lastname: "Rox", username: "michaellloo02", program: "Bio-Medicine"},
];

export default function AdminPage() {
  const state = useStates('main');
  const [getUsersList, setUsersList] = useState(tmpUsers);

  useEffect(() => {
    // (async () => setUsersList(await getUsers()))();
    // userSearch.value = '';
  }, []);

  return (
    <div>
      <Form.Group className="d-flex">
        <Form.Control id="userSearch" type="text" placeholder="Username" />
        <Button variant="success" 
          onClick={() => setUsersList(filterUsers(userSearch.value, getUsersList))} 
          type="submit">
            Search
        </Button>
        <Button variant="disabled" 
          onClick={e => {e.target.parentNode.childNodes[0].value = ''; setUsersList(tmpUsers)}} 
          type="reset"
          className="ms-1">
            Reset
        </Button>
      </Form.Group>
      <Table responsive className="align-middle user-table">
        <tbody>
          {
            state.program === 'All' ?
            getUsersList.map(u => <UserListItem key={u._id} userData={u}/>):
            getUsersList.filter(u => u.program === state.program).map(u => <UserListItem key={u._id} userData={u}/>)
          }
        </tbody>
      </Table>
    </div>
  );
}

function filterUsers(keyword, userList) {
  const result = userList.filter(u => {
    return (u.firstname.toLowerCase().includes(keyword.toLowerCase()) 
      || u.lastname.toLowerCase().includes(keyword.toLowerCase())
      || u.username.toLowerCase().includes(keyword.toLowerCase())
  )})
  return result;
}