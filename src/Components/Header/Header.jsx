import React, { useRef, useState } from "react";

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
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <header className="mb-5">
      <Navbar expand="md" className="bg-body-tertiary p-0" data-bs-theme="dark" fixed="top">
        <Container fluid className="container">
          <Navbar.Brand>
            <Link to="/">
              <img src="/logo_DealHunter-nobg.png" alt="" height="80" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-xl`} onClick={handleShow} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-xl`}
            aria-labelledby={`offcanvasNavbarLabel-expand-xl`}
            placement="end"
            bg="dark"
            data-bs-theme="dark"
            show={show}
            onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-xl`}>DealHunter</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3 align-items-md-center">
                <Link to="/" className="text-decoration-none text-white me-3 fs-5 fw-medium" onClick={handleClose}>
                  Home
                </Link>
                <NavDropdown
                  title={<span className="text-white fs-5 fw-medium">Games</span>}
                  id={`offcanvasNavbarDropdown-expand-xl`}
                  className="me-3">
                  <NavDropdown.Item
                    as={Link}
                    to="/interesting titles"
                    className="text-decoration-none text-white me-3 fs-6 fw-medium"
                    onClick={handleClose}>
                    Interesting titles
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/best deals"
                    className="text-decoration-none text-white me-3 fs-6 fw-medium"
                    onClick={handleClose}>
                    Best Deals
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/new deals"
                    className="text-decoration-none text-white me-3 fs-6 fw-medium"
                    onClick={handleClose}>
                    New Deals
                  </NavDropdown.Item>
                </NavDropdown>
                <Link to="/about" className="text-decoration-none text-white me-3 fs-5 fw-medium" onClick={handleClose}>
                  About
                </Link>
                <Link to="/contact" className="text-decoration-none text-white me-3 fs-5 fw-medium mb-md-0 mb-3" onClick={handleClose}>
                  Contact
                </Link>
              </Nav>
              <SearchInput onClose={handleClose} />
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </header>
  );
}

// Path: src/Components/SearchByName.jsx
