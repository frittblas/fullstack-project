import { React, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import { Link, useLocation } from "react-router-dom";
import { default as ReactNavbar } from 'react-bootstrap/Navbar';
import './Navbar.css';

import PostToggler from "../post-toggler/PostToggler";
import ProgramsDropdown from "../programs-dropdown/ProgramsDropdown";
import { useApi } from '../../hooks/useApi';
import { useLocalStorage } from '../../hooks/useLocalStorage';


export default function Navbar() {
  const api = useApi();
  const [user] = useLocalStorage('user', []);

  return (
    <ReactNavbar expand="sm" sticky="top">
      <Container fluid>
        <ReactNavbar.Brand as={Link} to="/users" >
          <img
            alt=""
            src="../../../hkr-logo.svg"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          Forum
        </ReactNavbar.Brand>
        {
          useLocation().pathname === '/admin' ?
            <ProgramsDropdown /> :
            ""
        }
        <div className="d-flex main-menu-wrap">
          {
            useLocation().pathname === '/users' ?
              <PostToggler /> :
              ""
          }
          {
            (user.programTitle === "admin" && useLocation().pathname !== '/admin') ?
              <div className="navbar-link-group"><Link to="/admin">Admin</Link></div> :
              ""
          }
          <div className="d-flex logout-wrap">
            <Nav.Link as={Link} to="/login" onClick={() => api.logoutUser()}>Logout</Nav.Link>
          </div>
        </div>
      </Container>
    </ReactNavbar>
  );
}
