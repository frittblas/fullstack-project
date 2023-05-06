import React from 'react';
import { MAIN_POST_THREAD_NAME } from './../../constants.js';
import Container from 'react-bootstrap/Container';
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer';
import UsersPage from '../../pages/users/UsersPage';
import AdminPage from '../../pages/admin/AdminPage';
import PostsPage from '../../pages/posts/PostsPage';
import Login from '../../pages/login/Login';
import Register from '../../pages/register/Register';
import About from '../../pages/about/About';
import Unauthorised from '../../pages/unauthorised/Unauthorised';
import Statistics from '../../pages/statistics/Statistics';
import { Routes, Route, useLocation } from "react-router-dom";
import { useStates } from 'react-easier';
import './App.css';

export default function App() {
  const state = useStates("main", {
    adminProgramSelected: MAIN_POST_THREAD_NAME,
    programMain: true
  });
  const location = useLocation();
  const hideNavbar = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/register';

  return (<>
    <main>
      {!hideNavbar && <Navbar />}
      <Container id="content">
        <Routes>
          <Route path="/" element={<Login />}> </Route>
          <Route path="/users" element={<UsersPage />}> </Route>
          <Route path="/admin" element={<AdminPage />}> </Route>
          <Route path="/posts/:postId" element={<PostsPage />}> </Route>
          <Route path="/login" element={<Login />}> </Route>
          <Route path="/register" element={<Register />}> </Route>
          <Route path="/about" element={<About />}> </Route>
          <Route path="/unauth" element={<Unauthorised />}> </Route>
          <Route path="/statistics" element={<Statistics />}> </Route>
        </Routes>
      </Container>
    </main>
    <Footer />
  </>
  );
}
