import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";
import './Footer.css';

export default function Footer() {
  return (<>
    <footer className="fixed-bottom text-center bg-light text-dark p-3" >
      <div className="row">
        <div className="col d-flex align-items-center justify-content-center">
          © Copyright by&nbsp;
          <Nav.Link as={Link} to="/about" className="group9-link">Group9</Nav.Link>
        </div>
      </div>
    </footer>
  </>
  );
}