import { React, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import UserListItem from '../../components/user-list-item/UserListItem';
import { getUsers, getPrograms } from '../../services/api';
import { useStates } from 'react-easier';
import { MAIN_POST_THREAD_NAME } from './../../constants.js';
import './AdminPage.css';

export default function AdminPage() {
  const state = useStates('main');
  const [isInitLoad, setInitLoad] = useState(true);
  const [getCurrentProg, setCurrentProg] = useState(MAIN_POST_THREAD_NAME);
  const [getMainUserList, setMainUserList] = useState([]);
  const [getUsersList, setUsersList] = useState([]);

  useEffect(() => {
    (async () => {
      const users = await getUsers();
      setMainUserList(users);
      setUsersList(users);
      setInitLoad(false);
    })(setMainUserList, setUsersList, setInitLoad);
  }, []);

  if (state.program !== getCurrentProg) {
    resetSearchField();
    setCurrentProg(state.program);
    if (state.program === MAIN_POST_THREAD_NAME) setUsersList(getMainUserList);
    else setUsersList(getMainUserList.filter(u => u.programTitle === state.program));
  }

  return (
    <div>
      <Form.Group className="d-flex">
        <Form.Control id="userSearch" type="text" placeholder="first, last, username" />
        <Button variant="success" 
          onClick={() => setUsersList(filterUsers(userSearch.value, getUsersList))} 
          type="submit">
            Search
        </Button>
        <Button variant="disabled" 
          onClick={() => setCurrentProg('')} 
          type="reset"
          className="ms-1">
            Reset
        </Button>
      </Form.Group>
      {
        isInitLoad ?
        <div className="spinner-wrap"><Spinner animation="border" /></div> :
        <Table responsive className="align-middle user-table">
          <tbody>
            {
              getUsersList.map(u => <UserListItem key={u._id} userData={u}/>)
            }
          </tbody>
        </Table>
      }
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

function resetSearchField() {
  userSearch.value = '';
}