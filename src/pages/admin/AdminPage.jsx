import { React, useState, useEffect } from 'react';
import SearchBar from '../../components/search-bar/SearchBar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import UserListItem from '../../components/user-list-item/UserListItem';
import { useStates } from 'react-easier';
import { MAIN_POST_THREAD_NAME } from './../../constants.js';
import './AdminPage.css';
import { useApi } from '../../hooks/useApi';
import Modal from 'react-bootstrap/Modal';
import AddUserModal from './UserModal';

export default function AdminPage() {
  const api = useApi();
  const state = useStates('main');
  const [isInitLoad, setInitLoad] = useState(true);
  const [getCurrentProg, setCurrentProg] = useState(MAIN_POST_THREAD_NAME);
  const [getMainUserList, setMainUserList] = useState([]);
  const [getUsersList, setUsersList] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    programTitle: '',
    profileImg: ''
  });

  useEffect(() => {
    console.log("useEffect executed");
    (async () => {
      const users = await api.getUsers();
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

  const handleAddUser = async (e) => {
    if (e) {
      e.preventDefault();
    }
    try {
      // add code to submit the form data to the server
      setShowModal(false);
      await api.createUser(formData); // change to createNewUser
      const updatedUserList = await api.getUsers();
      setMainUserList(updatedUserList);
      setUsersList(updatedUserList);
      setFormData({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        programTitle: '',
        profileImg: ''
      });
    } catch (error) {
      console.error(error.message);
    }
  };
  
  const handleDeleteUsers = async () => {
    console.log("clicked on delete button")
    try {
      console.log("selectedUsers:", selectedUsers);
      const promises = selectedUsers.map((username) => api.deleteUser(username));
      console.log("promises:", promises);
      await Promise.all(promises);
      const updatedUserList = await api.getUsers();
      console.log("updatedUserList:", updatedUserList);
      setMainUserList(updatedUserList);
      setUsersList(updatedUserList);
      setSelectedUsers([]);
    } catch (error) {
      console.error(error.message);
    }
  };
  
  if (state.adminProgramSelected !== getCurrentProg) {
    resetSearchField();
    setCurrentProg(state.adminProgramSelected);
    if (state.adminProgramSelected === MAIN_POST_THREAD_NAME) setUsersList(getMainUserList);
    else setUsersList(getMainUserList.filter(u => u.programTitle === state.adminProgramSelected));
  }

  return (
    <div>
      <Form.Group className="d-flex">
        <Button
          variant="danger"
          onClick={() => handleDeleteUsers()}
          type="button"
          className="delete me-1"
          disabled={selectedUsers.length === 0}
          size="sm"
        >
          Delete
        </Button>
        <Button
          variant="danger"
          onClick={() => setShowModal(true)}
          size="sm"
        >
          New User
        </Button>
        <AddUserModal
          showModal={showModal}
          setShowModal={setShowModal}
          formData={formData}
          setFormData={setFormData}
          handleAddUser={handleAddUser}
        />
        <SearchBar onSearch={(e, val) => setUsersList(filterUsers(val, getUsersList))} onReset={() => setCurrentProg('')} placeholder="first, last, username" />
      </Form.Group>
  
      {isInitLoad ? (
        <div className="spinner-wrap">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table responsive className="align-middle user-table">
          <tbody>
            {getUsersList && getUsersList.map(u => (
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
  searchBar.value = '';
}
  