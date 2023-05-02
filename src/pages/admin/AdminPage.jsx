import { React, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import UserListItem from '../../components/user-list-item/UserListItem';
import { getUsers, getPrograms } from '../../services/api';
import { deleteUser } from '../../services/api';
import { useStates } from 'react-easier';
import './AdminPage.css';

export default function AdminPage() {
  const state = useStates('main');
  const [isInitLoad, setInitLoad] = useState(true);
  const [getCurrentProg, setCurrentProg] = useState('All');
  const [getMainUserList, setMainUserList] = useState([]);
  const [getUsersList, setUsersList] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    console.log("useEffect executed");
    (async () => {
      const users = await getUsers();
       console.log(users);
      setMainUserList(users);
      setUsersList(users);
      setInitLoad(false);
    })();
  }, []);

  const handleSelectUser = (userId) => {
    const index = selectedUsers.indexOf(userId);
    if (index > -1) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleDeleteUsers = async () => {
    console.log("clicked on delete button")
    try {
      console.log("selectedUsers:", selectedUsers);
      const promises = selectedUsers.map((username) => deleteUser(username));
      console.log("promises:", promises);
      await Promise.all(promises);
      const updatedUserList = await getUsers();
      console.log("updatedUserList:", updatedUserList);
      setMainUserList(updatedUserList);
      setUsersList(updatedUserList);
      setSelectedUsers([]);
    } catch (error) {
      console.error(error.message);
    }
  };
  
  
  if (state.program !== getCurrentProg) {
    resetSearchField();
    setCurrentProg(state.program);
    if (state.program === 'All') setUsersList(getMainUserList);
    else setUsersList(getMainUserList.filter(u => u.programTitle === state.program));
  }

  return (
    <div>
      <Form.Group className="d-flex">
        <Form.Control id="userSearch" type="text" placeholder="first, last, username" />
        <Button
          variant="success"
          onClick={() => setUsersList(filterUsers(userSearch.value, getUsersList))}
          type="submit"
        >
          Search
        </Button>
        <Button
          variant="disabled"
          onClick={() => setCurrentProg('')}
          type="reset"
          className="ms-1"
        >
          Reset
        </Button>
      </Form.Group>
      <div className="d-flex mb-3">
        <Button
          variant="danger"
          onClick={() => handleDeleteUsers()}
          type="button"
          className="delete ms-1"
          disabled={selectedUsers.length === 0}
        >
          Delete
        </Button>
      </div>
      {isInitLoad ? (
        <div className="spinner-wrap">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table responsive className="align-middle user-table">
          <tbody>
            {getUsersList.map(u => (
              <UserListItem
                key={u._id}
                userData={u}
                selected={selectedUsers.includes(u._id)}
                onSelect={() => handleSelectUser(u._id)}
              />
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

function filterUsers(keyword, userList) {
  const result = userList.filter(u => {
    return (
      u.firstname.toLowerCase().includes(keyword.toLowerCase()) ||
      u.lastname.toLowerCase().includes(keyword.toLowerCase()) ||
      u.username.toLowerCase().includes(keyword.toLowerCase())
    );
  });

  return result;
}


function resetSearchField() {
  userSearch.value = '';
}
  