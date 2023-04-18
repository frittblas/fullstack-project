import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer';
import UsersPage from '../../pages/users/UsersPage';
import AdminPage from '../../pages/admin/AdminPage';
import PostsPage from '../../pages/posts/PostsPage';
import Login from '../../pages/login/Login';
import Register from '../../pages/register/Register';
import { Routes, Route, useLocation } from "react-router-dom";
import { useStates } from 'react-easier';

import './App.css';


export default function App() {
  const state = useStates("main", {
    // dummy programsList
    programsList: [{"_id":"64369652372d6ab6b4c15118","programTitle":"Software Development"},{"_id":"64369669372d6ab6b4c15119","programTitle":"Economics"},{"_id":"64369674372d6ab6b4c1511a","programTitle":"IoT Engineers"},{"_id":"64369683372d6ab6b4c1511c","programTitle":"Business Administration"},{"_id":"643696b4372d6ab6b4c1511f","programTitle":"Digital Design"},{"_id":"643696da372d6ab6b4c15120","programTitle":"Food and Meal Science"}],
    program: 'All'
  });
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

  return (<>
    <main>
      {!hideNavbar && <Navbar />}
      <Container id="content">
        <Routes>
          <Route path="/users" element={<UsersPage />}> </Route>
          <Route path="/admin" element={<AdminPage />}> </Route>
          <Route path="/posts/:id" element={<PostsPage />}> </Route>
          <Route path="/login" element={<Login />}> </Route>
          <Route path="/register" element={<Register />}> </Route>
        </Routes>
      </Container>
    </main>
    <Footer />
  </>
  );
}
