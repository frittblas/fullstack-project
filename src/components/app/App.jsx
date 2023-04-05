import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from '../navbar/Navbar'
import Welcome from '../Welcome';
import Hkr from '../Hkr';
import It from '../It';
import About from '../About';
import Footer from '../Footer';
import User from '../../pages/user/User';
import { Routes, Route } from "react-router-dom";

import './App.css';

export default function App() {
  return (<>
    <main>
      <Navbar />
      <Container id="content">
        <Routes>
          <Route path="/" element={<Welcome />}> </Route>
          <Route path="/hkr" element={<Hkr />}> </Route>
          <Route path="/it" element={<It />}> </Route>
          <Route path="/about" element={<About />}> </Route>
          <Route path="/user" element={<User />}> </Route>
        </Routes>
      </Container>
    </main>
    <Footer />
  </>
  );
}
