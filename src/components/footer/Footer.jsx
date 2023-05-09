import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer({ className }) {
  return (
    <footer className={`footer ${className}`}>
      <div className="container">
        <div className="row">
          <div className="col d-flex align-items-center justify-content-center">
            <div className="d-flex align-items-center">
              <p className="mb-0">
                © Group9. All rights reserved.&nbsp;&nbsp;&nbsp;
              </p>
              <Nav.Link as={Link} to="/about" className="about-link">
                About us
              </Nav.Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
