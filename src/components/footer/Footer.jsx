import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";
import './Footer.css';

export default function Footer() {
  return (<>
    <footer className="fixed-bottom text-center bg-light text-dark p-3" >
      <div className="row">
        <div className="col d-flex align-items-center justify-content-center">
          © Copyright by Group9&nbsp;&nbsp;&nbsp;
          <Nav.Link as={Link} to="/about" className="about-link">About us</Nav.Link>
        </div>
      </div>
    </footer>
  </>
  );
}