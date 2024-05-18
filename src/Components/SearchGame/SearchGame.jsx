import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { getListGames } from "../../Services/file";
import SearchGameListCards from "./SearchGameListCards";

import "./SearchGame.css";

export default function SearchGame() {
  const location = useLocation();
  const nameGame = location.pathname.split("/")[2];

  const [relatedGames, setRelatedGames] = useState([]);
  // const [searchFilteredGames, setSearchFilteredGames] = useState([]);

  const fetchGames = async () => {
    const promises = [];
    promises.push(getListGames(nameGame));
    const response = await Promise.all(promises);

    const data = [];
    response.forEach((res) => {
      data.push(res);
    });

    const matchingGames = data[0].filter((game) => game.external.toLowerCase().startsWith(nameGame.toLowerCase()));

    setRelatedGames(matchingGames);
    // setSearchFilteredGames(data);
  };

  useEffect(() => {
    fetchGames();
  }, [nameGame]);

  // const [showPanel, setShowPanel] = useState(false);

  // const togglePanel = () => {
  //   setShowPanel(!showPanel);
  // };

  // const panelRef = useRef(null);

  // const handleClickOutside = (event) => {
  //   if (panelRef.current && !panelRef.current.contains(event.target)) {
  //     setShowPanel(false);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  // const handleFilter = () => {
  //   const priceOrder = document.getElementById("price").value;

  //   let sortedGames = [...searchFilteredGames];

  //   if (priceOrder === "asc") {
  //     sortedGames.sort((a, b) => a.price - b.price);
  //   } else if (priceOrder === "desc") {
  //     sortedGames.sort((a, b) => b.price - a.price);
  //   }

  //   setSearchFilteredGames(sortedGames);
  // };

  // const cleanFilter = () => {
  //   // Lógica para limpiar los filtros
  // };

  return (
    <div className="container mt-5 pt-5">
      <h2 className="text-white mb-4">Search results for "{decodeURIComponent(nameGame)}"</h2>
      {/* <div className="mb-4">
        <button className="btn btn-secondary toggle-btn" onClick={togglePanel}>
          <i className="fas fa-filter me-2"></i>Filter
        </button>
        <div ref={panelRef} className={`side-panel ${showPanel ? "show" : ""} bg-black text-white`}>
          <div className="p-3">
            <h5 className="mb-4">Filter Options</h5>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <select className="form-select" id="price">
                <option selected>Any</option>
                <option value="asc">Low to High</option>
                <option value="desc">High to Low</option>
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
            <div className="text-center">
              <button className="btn btn-secondary mb-3" onClick={cleanFilter}>
                Reset Filters
              </button>
              <button className="btn btn-primary" onClick={handleFilter}>
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div> */}
      <SearchGameListCards games={relatedGames} />
    </div>
  );
}
