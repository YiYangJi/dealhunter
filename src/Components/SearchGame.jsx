import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { getListGames } from "../Services/file";
import ListCards from "./ListCards";

import "./SearchGame.css";

export default function SearchGame() {
  const location = useLocation();
  const nameGame = location.pathname.split("/")[2];

  const [relatedGames, setRelatedGames] = useState([]);

  const fetchGames = async () => {
    const promises = [];
    promises.push(getListGames(nameGame));
    const response = await Promise.all(promises);

    const data = [];
    response.forEach((res) => {
      data.push(res);
    });

    setRelatedGames(data);
  };

  useEffect(() => {
    fetchGames();
  }, [nameGame]);

  const [showPanel, setShowPanel] = useState(false);

  const togglePanel = () => {
    setShowPanel(!showPanel);
  };

  const panelRef = useRef(null);

  const handleClickOutside = (event) => {
    if (panelRef.current && !panelRef.current.contains(event.target)) {
      setShowPanel(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="container mt-5 pt-5">
      <h2 className="text-white mb-4">Search results for "{decodeURIComponent(nameGame)}"</h2>
      <div className="mb-4">
        {/* Botón de alternar para el panel lateral de filtro */}
        <button className="btn btn-secondary toggle-btn" onClick={togglePanel}>
          <i className="fas fa-filter me-2"></i>Filter
        </button>
        {/* Panel lateral de filtro */}
        <div ref={panelRef} className={`side-panel ${showPanel ? "show" : ""} bg-black text-white`}>
          <div className="p-3">
            <h5 className="mb-4">Filter Options</h5>
            {/* Opciones de filtro (ejemplo) */}
            <div className="mb-3">
              <label htmlFor="platform" className="form-label">
                Platform
              </label>
              <select className="form-select" id="platform">
                <option selected>All Platforms</option>
                <option>PC</option>
                <option>Xbox</option>
                <option>PlayStation</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="genre" className="form-label">
                Genre
              </label>
              <select className="form-select" id="genre">
                <option selected>All Genres</option>
                <option>Action</option>
                <option>Adventure</option>
                <option>RPG</option>
              </select>
            </div>
            {/* Agregar más opciones de filtro según sea necesario */}
            <button className="btn btn-primary">Apply Filters</button>
          </div>
        </div>
      </div>
      <ListCards games={relatedGames} />
    </div>
  );
}
