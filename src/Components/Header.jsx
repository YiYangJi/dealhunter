import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import SearchInput from "./SearchInput";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved

// Componente que se encarga de renderizar los botones de busqueda de las comidas
export default function Header() {
  return (
    <header className="mb-5">
      <Navbar expand="md" className="bg-body-tertiary p-0" bg="dark" data-bs-theme="dark" fixed="top">
        <Container fluid className="container">
          <Navbar.Brand>
            <Link to="/">
              <img src="/logo_DealHunter-nobg.png" alt="" height="80" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-xl`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-xl`}
            aria-labelledby={`offcanvasNavbarLabel-expand-xl`}
            placement="end"
            bg="dark"
            data-bs-theme="dark">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-xl`}>DealHunter</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3 align-items-center">
                <Link to="/" className="text-decoration-none text-white me-3 fs-5 fw-medium">
                  Home
                </Link>
                <NavDropdown
                  title={<span className="text-white fs-5 fw-medium">Games</span>}
                  id={`offcanvasNavbarDropdown-expand-xl`}
                  className="me-3">
                  <NavDropdown.Item>
                    <Link to="/interesting titles" className="text-decoration-none text-white me-3 fs-6 fw-medium">
                      Interesting titles
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/best deals" className="text-decoration-none text-white me-3 fs-6 fw-medium">
                      Best Deals
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/new deals" className="text-decoration-none text-white me-3 fs-6 fw-medium">
                      New Deals
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
                <Link to="/about" className="text-decoration-none text-white me-3 fs-5 fw-medium">
                  About
                </Link>
                <Link to="/contact" className="text-decoration-none text-white me-3 fs-5 fw-medium">
                  Contact
                </Link>
              </Nav>
              <SearchInput />
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </header>
  );
}

// Path: src/Components/SearchByName.jsx
