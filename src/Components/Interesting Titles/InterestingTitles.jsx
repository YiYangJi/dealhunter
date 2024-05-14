import React, { useEffect, useState } from "react";
import "../Interesting Titles/InterestingTitles.css";
import { getAllListDeals, getAllListDealsCheckboxFilter, getAllListDealsRadioFilter, getListDeals } from "../../Services/file";
import InterestingTitlesCard from "./InterestingTitlesCard";

import { Tooltip, OverlayTrigger } from "react-bootstrap";

export default function InterestingTitles() {
  const [games, setGames] = useState([]);
  const [uniqueGames, setUniqueGames] = useState([]);

  const [page, setPage] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchListDeals = async () => {
      const promises = [];
      promises.push(getAllListDeals(page));
      const response = await Promise.all(promises);

      const data = [];
      response.forEach((res) => {
        data.push(res);
      });

      setGames(data);

      let unique =
        data[0] && !data[0].error ? data[0].filter((game, index, self) => index === self.findIndex((t) => t.gameID === game.gameID)) : [];

      setUniqueGames(unique);
    };

    fetchListDeals();
  }, [page]);

  useEffect(() => {
    if (games) {
      let uniqueFilter =
        games[0] && !games[0].error
          ? games[0].filter((game, index, self) => index === self.findIndex((t) => t.gameID === game.gameID))
          : [];

      setFilteredGames(uniqueFilter);
    }
    handleFilter();
  }, [games]);

  /////////////////////////////////////////////
  // PAGINATION LOGIC
  /////////////////////////////////////////////

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 0)); // No permitir que la página sea menor a 1
  };

  // FILTERS LOGIC
  const [priceLimit, setPriceLimit] = useState(50);
  const [filteredGames, setFilteredGames] = useState([]);

  const [radioSelectedOption, setRadioSelectedOption] = useState("");
  const [checkboxes, setCheckboxes] = useState({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
  });

  const handleFilter = () => {
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Filter by price
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    console.log(priceLimit); // Check the value of priceLimit
    console.log(uniqueGames); // Check the value of uniqueGames
    if (uniqueGames && uniqueGames.length > 0) {
      let filtered = uniqueGames.filter((game) => Number(game.salePrice) <= priceLimit);
      setFilteredGames(filtered);
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Filter by offer date
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const fetchListDealsbyOffer = async () => {
      const promises = [];
      promises.push(getAllListDealsRadioFilter(radioSelectedOption));
      const response = await Promise.all(promises);

      const data = [];
      response.forEach((res) => {
        data.push(res);
      });

      console.log(data);

      setGames(data);
    };

    if (radioSelectedOption) {
      fetchListDealsbyOffer();
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Filter by checkboxes
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const fetchListDealsbyCheckboxes = async () => {
      const promises = [];
      promises.push(
        getAllListDealsCheckboxFilter(Number(checkboxes.checkbox1), Number(checkboxes.checkbox2), Number(checkboxes.checkbox3))
      );
      const response = await Promise.all(promises);

      const data = [];
      response.forEach((res) => {
        data.push(res);
      });

      console.log(data);

      setGames(data);
    };

    if (Object.values(checkboxes).some((checkbox) => checkbox === true)) {
      fetchListDealsbyCheckboxes();
    }
  };

  const handleRadioOptionChange = (event) => {
    setRadioSelectedOption(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setCheckboxes({
      ...checkboxes,
      [event.target.name]: event.target.checked,
    });
  };

  const cleanFilter = () => {
    setFilteredGames(uniqueGames);
    setRadioSelectedOption("");
    setCheckboxes({
      checkbox1: false,
      checkbox2: false,
      checkbox3: false,
    });
  };

  return (
    <>
      <div className="interestingTitles__bg-presentation-overlay pt-4 d-flex align-items-center justify-content-center">
        <div className="text-white">
          <h1 className="pt-5 fw-bold mb-5 interestingTitles__h1--title">Interesting titles</h1>
        </div>
      </div>

      <div className="container mx-auto row mt-5">
        <div className="col-md-3 text-white">
          <div className="p-3 bg-black rounded">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="fw-bold">FILTERS</h3>
              <i className="fas fa-filter me-2"></i>
            </div>
            <div className="my-4">
              <h4>Price</h4>
              <label className="slider w-100 text-center">
                <input
                  type="range"
                  min="0"
                  max="200"
                  className="level"
                  onInput={(event) => {
                    event.target.nextElementSibling.value = event.target.value;
                    setPriceLimit(event.target.value);
                  }}
                />
                Limit Price: <output>50</output>€
              </label>
            </div>

            <div className="my-4">
              <h4>Offer date</h4>

              <div className="radio-buttons-container">
                <div className="radio-button">
                  <input
                    name="radio-group"
                    id="radio2"
                    className="radio-button__input"
                    type="radio"
                    value=""
                    checked={radioSelectedOption === ""}
                    onChange={handleRadioOptionChange}
                  />
                  <label htmlFor="radio2" className="radio-button__label">
                    <span className="radio-button__custom"></span>
                    All offers
                  </label>
                </div>
                <div className="radio-button">
                  <input
                    name="radio-group"
                    id="radio1"
                    className="radio-button__input"
                    type="radio"
                    value="24"
                    checked={radioSelectedOption === "24"}
                    onChange={handleRadioOptionChange}
                  />
                  <label htmlFor="radio1" className="radio-button__label">
                    <span className="radio-button__custom"></span>
                    Last 24h offers
                  </label>
                </div>
                <div className="radio-button">
                  <input
                    name="radio-group"
                    id="radio3"
                    className="radio-button__input"
                    type="radio"
                    value="168"
                    checked={radioSelectedOption === "168"}
                    onChange={handleRadioOptionChange}
                  />
                  <label htmlFor="radio3" className="radio-button__label">
                    <span className="radio-button__custom"></span>
                    Last week offers
                  </label>
                </div>
                <div className="radio-button">
                  <input
                    name="radio-group"
                    id="radio4"
                    className="radio-button__input"
                    type="radio"
                    value="720"
                    checked={radioSelectedOption === "720"}
                    onChange={handleRadioOptionChange}
                  />
                  <label htmlFor="radio4" className="radio-button__label">
                    <span className="radio-button__custom"></span>
                    Last month offers
                  </label>
                </div>
              </div>
            </div>

            <div className="my-4">
              <div className="checkbox-wrapper-4">
                <input
                  type="checkbox"
                  id="aaa"
                  className="inp-cbx"
                  name="checkbox1"
                  checked={checkboxes.checkbox1}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="aaa" className="cbx ps-0 pb-1">
                  <span>
                    {" "}
                    <svg height="10px" width="12px"></svg>
                  </span>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip id={`tooltip-right`}>Filters games with a current retail price greater than 29€</Tooltip>}>
                    <span> AAA</span>
                  </OverlayTrigger>
                </label>
                <svg className="inline-svg">
                  <symbol viewBox="0 0 12 10" id="check-4">
                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                  </symbol>
                </svg>
              </div>
              <div className="checkbox-wrapper-4">
                <input
                  type="checkbox"
                  id="steamWorks"
                  className="inp-cbx"
                  name="checkbox2"
                  checked={checkboxes.checkbox2}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="steamWorks" className="cbx ps-0 pb-1">
                  <span>
                    {" "}
                    <svg height="10px" width="12px"></svg>
                  </span>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip id={`tooltip-right`}>Filter only the games that redeem on Steam</Tooltip>}>
                    <span> SteamWorks</span>
                  </OverlayTrigger>
                </label>
                <svg className="inline-svg">
                  <symbol viewBox="0 0 12 10" id="check-4">
                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                  </symbol>
                </svg>
              </div>

              <div className="checkbox-wrapper-4">
                <input
                  type="checkbox"
                  id="onsale"
                  className="inp-cbx"
                  name="checkbox3"
                  checked={checkboxes.checkbox3}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="onsale" className="cbx ps-0 pb-1">
                  <span>
                    {" "}
                    <svg height="10px" width="12px"></svg>
                  </span>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip id={`tooltip-right`}>Include only games that are currently on sale</Tooltip>}>
                    <span> On sale</span>
                  </OverlayTrigger>
                </label>
                <svg className="inline-svg">
                  <symbol viewBox="0 0 12 10" id="check-4">
                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                  </symbol>
                </svg>
              </div>
            </div>
            <div className="text-center mt-3">
              <button className="btn btn-secondary me-3" onClick={cleanFilter}>
                Clean filters
              </button>
              <button className="btn btn-primary" onClick={handleFilter}>
                Filter
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          {filteredGames &&
            filteredGames.map((game) => {
              return <InterestingTitlesCard game={game} key={game.gameID} />;
            })}
        </div>
        <div className="d-flex justify-content-center">
          <button className="btn btn-primary me-5" onClick={handlePreviousPage}>
            Previous
          </button>
          <button className="btn btn-primary" onClick={handleNextPage}>
            Next
          </button>
        </div>
      </div>
    </>
  );
}
