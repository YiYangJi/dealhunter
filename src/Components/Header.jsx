import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import SearchInput from "./SearchInput";
// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved

// Componente que se encarga de renderizar los botones de busqueda de las comidas
export default function Header() {
  return (
    <header className="pt-5">
      <nav className="navbar navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <Link to="/">
            <img src="/logo_DealHunter-nobg.png" alt="" height="80" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasDarkNavbar"
            aria-controls="offcanvasDarkNavbar"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end text-bg-dark"
            tabIndex="-1"
            id="offcanvasDarkNavbar"
            aria-labelledby="offcanvasDarkNavbarLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
                DealHunter
              </h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <Link to="/" className="text-decoration-none nav-link text-light">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/searchByName" className="text-decoration-none nav-link text-light">
                    Search a meal by name
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/searchByIngredient" className="text-decoration-none nav-link text-light">
                    Search a meal by ingredient
                  </Link>
                </li>
              </ul>
              <SearchInput />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

// Path: src/Components/SearchByName.jsx
