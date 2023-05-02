import { React, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import { Link, useLocation } from "react-router-dom";
import { default as ReactNavbar } from 'react-bootstrap/Navbar';
import './Navbar.css';

import PostToggler from "../post-toggler/PostToggler";
import ProgramsDropdown from "../programs-dropdown/ProgramsDropdown";
import { logoutUser } from '../../services/api';


const handleLogout = async (event) => {
  event.preventDefault();
  console.log("logoutUser?")
}

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
        {
          useLocation().pathname === '/users' ?
            <PostToggler /> :
            ""
        }
        {
          useLocation().pathname === '/admin' ?
            <ProgramsDropdown /> :
            ""
        }
        <div className="d-flex logout-wrap">
          <Nav.Link as={Link} to="/login" onClick={handleLogout}>Logout</Nav.Link>
        </div>
      </Container>
    </ReactNavbar>
  );
}
