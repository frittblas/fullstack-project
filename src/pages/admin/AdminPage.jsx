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
    (async () => {
      const users = await api.getUsers();
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
      <Form.Group className="d-flex flex-wrap align-items-center justify-content-center" style={{ gap: '40px' }}>
        <Button
          variant="danger"
          onClick={() => handleDeleteUsers()}
          type="button"
          className="delete rounded btn-light-green"
          style={{ width: '120px' }}
          disabled={selectedUsers.length === 0}
        >
          Delete
        </Button>
        <Button
          variant="success"
          onClick={() => setShowModal(true)}
          style={{ width: '120px' }}
          className="rounded btn-light-green"
        >
          New User
        </Button>
        <Button
          variant="primary"
          onClick={() => handleStats()}
          type="button"
          style={{ width: '120px' }}
          className="rounded new-user-btn btn-light-green"
        >
          Stats
        </Button>
        <Button
          variant="info"
          onClick={() => handlePosts()}
          type="button"
          style={{ width: '120px' }}
          className="rounded new-user-btn btn-light-green"
        >
          Posts
        </Button>
        <AddUserModal
          showModal={showModal}
          setShowModal={setShowModal}
          formData={formData}
          setFormData={setFormData}
          handleAddUser={handleAddUser}
        />
        <div className="w-100">
          <div className="input-group input-group-sm">
            <Form.Control id="userSearch" type="text" placeholder="Search" className="flex-grow-1 custom-search" />
            <Button
              variant="success"
              onClick={() => setUsersList(filterUsers(userSearch.value, getUsersList))}
              type="submit"
              className="rounded"
              style={{ width: '90px', height: '40px' }}
            >
              Search
            </Button>
            <Button
              variant="disabled"
              onClick={() => setCurrentProg('')}
              type="reset"
              className="ms-1 rounded"
              style={{ width: '90px', height: '40px' }}
            >
              Reset
            </Button>
          </div>
        </div>
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
  );}

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
  