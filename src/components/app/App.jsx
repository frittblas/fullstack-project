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
  const state = useStates("main", {name: "Pete", program: 'All'});
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

  return (<>
    <main>
      {!hideNavbar && <Navbar />}
      <Container id="content">
        <Routes>
          <Route path="/users" element={<UsersPage />}> </Route>
          <Route path="/admin" element={<AdminPage />}> </Route>
          <Route path="/posts" element={<PostsPage />}> </Route>
          <Route path="/login" element={<Login />}> </Route>
          <Route path="/register" element={<Register />}> </Route>
        </Routes>
      </Container>
    </main>
    <Footer />
  </>
  );
}
