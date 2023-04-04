import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Welcome from './Welcome';
import Hkr from './Hkr';
import It from './It';
import About from './About';
import Footer from './Footer';
import { Routes, Route, Link } from "react-router-dom";

export default function App() {
  return (<>
    <main>
      <Navbar bg="light" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/hkr">Hkr</Nav.Link>
              <Nav.Link as={Link} to="/It">It</Nav.Link>
              <Nav.Link as={Link} to="/about">About</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
        <Routes>
          <Route path="/" element={<Welcome />}> </Route>
          <Route path="/hkr" element={<Hkr />}> </Route>
          <Route path="/it" element={<It />}> </Route>
          <Route path="/about" element={<About />}> </Route>
        </Routes>
      </div>
    </main>
    <Footer />
  </>
  );
}
