import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from '../navbar/Navbar'
import Welcome from '../Welcome';
import Hkr from '../Hkr';
import It from '../It';
import About from '../About';
import Footer from '../footer/Footer';
import UsersPage from '../../pages/users/UsersPage';
import AdminPage from '../../pages/admin/AdminPage';
import PostsPage from '../../pages/posts/PostsPage';
import Login from '../../pages/login/Login';
import Register from '../../pages/register/Register';
import { Routes, Route, useLocation } from "react-router-dom";

import './App.css';


export default function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

  return (<>
    <main>
      {!hideNavbar && <Navbar />}
      <Container id="content">
        <Routes>
          <Route path="/" element={<Welcome />}> </Route>
          <Route path="/hkr" element={<Hkr />}> </Route>
          <Route path="/it" element={<It />}> </Route>
          <Route path="/about" element={<About />}> </Route>
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
