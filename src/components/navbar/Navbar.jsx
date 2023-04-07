import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import { Link, useLocation } from "react-router-dom";
import {default as ReactNavbar} from 'react-bootstrap/Navbar';
import './Navbar.css';

import PostToggler from "../post-toggler/PostToggler";
import ProgramsDropdown from "../programs-dropdown/ProgramsDropdown";

export default function Navbar() {
  return (
    <ReactNavbar expand="lg" sticky="top">
      <Container fluid>
        <ReactNavbar.Brand href="#home">
          <img
            alt=""
            src="../../../public/hkr-logo.svg"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          Forum
        </ReactNavbar.Brand>
        <div>
        {
          useLocation().pathname === '/user' ?
          <PostToggler />:
          ""
        }
        {
          useLocation().pathname === '/admin' ?
          <ProgramsDropdown />:
          ""
        }
        </div>
        <div className="d-flex logout-wrap">
          <Nav.Link as={Link} to="/about">Logout</Nav.Link>
        </div>
      </Container>
    </ReactNavbar>
  );
}
