import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { getListGames } from "../../Services/AsyncFunctions";
import SearchGameListCards from "./SearchGameListCards";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./SearchGame.css";

export default function SearchGame() {
  const location = useLocation();
  const nameGame = decodeURIComponent(location.pathname.split("/")[2]);

  const [relatedGames, setRelatedGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [searchFilteredGames, setSearchFilteredGames] = useState([]);

  let toastDisplayed = false;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchGames = async () => {
    setIsLoading(true);
    try {
      const promises = [];
      promises.push(getListGames(nameGame));
      const response = await Promise.all(promises);

      if (
        response[0] &&
        !response[0].ok &&
        response[0] &&
        response[0].error &&
        response[0].error.includes("You are being temporarily blocked due to rate limiting")
      ) {
        if (!toastDisplayed) {
          toast.error(<div className="text-center">You have made too many requests. Please try again later.</div>);
          toastDisplayed = true;
        }
      }

      const data = [];
      response.forEach((res) => {
        data.push(res);
      });

      let matchingGames = [];

      if (data && data[0]) {
        matchingGames = data[0].filter((game) => game.external.toLowerCase().startsWith(nameGame.toLowerCase()));
      }

      setRelatedGames(matchingGames);

      console.log(matchingGames);
      // setSearchFilteredGames(data);
    } catch (error) {
      if (!toastDisplayed) {
        toast.error("Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.");
        toastDisplayed = true;
      }
    } finally {
      setIsLoading(false);
    }
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
    <>
      <div className="container mt-5 pt-5">
        <h2 className="text-white my-4">Search results for "{decodeURIComponent(nameGame)}"</h2>

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
        <SearchGameListCards games={relatedGames} isLoading={isLoading} />
      </div>
      <ToastContainer position="bottom-center" autoClose={2000} closeOnClick pauseOnFocusLoss={false} draggable theme="dark" />
    </>
  );
}
