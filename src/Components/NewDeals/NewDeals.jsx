import React, { useEffect, useRef, useState } from "react";
import "./NewDeals.css";
import { getAllNewDeals, getAllNewDealsFilter } from "../../Services/file";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import ListCards from "../ListCards";
import Loading from "../Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function InterestingTitles() {
  const [InterestingGames, setInterestingGames] = useState([]);
  const [uniqueInterestingGames, setUniqueInterestingGames] = useState([]);

  const [page, setPage] = useState(0);

  const [priceLimit, setPriceLimit] = useState(50);
  const [filteredInterestingGames, setFilteredInterestingGames] = useState([]);
  const [radioSelectedOption, setRadioSelectedOption] = useState("2500");
  const [checkboxes, setCheckboxes] = useState({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const toastDisplayedRef = useRef(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchListDeals = async () => {
      const promises = [];
      promises.push(getAllNewDeals(page));
      const response = await Promise.all(promises);

      if (
        response[0] &&
        !response[0].ok &&
        response[0] &&
        response[0].error &&
        response[0].error.includes("You are being temporarily blocked due to rate limiting")
      ) {
        if (!toastDisplayedRef.current) {
          toast.error(<div className="text-center">You have made too many requests. Please try again later.</div>);
          toastDisplayedRef.current = true;
        }
      }

      const data = [];
      response.forEach((res) => {
        data.push(res);
      });

      setInterestingGames(data);

      let unique =
        data[0] && !data[0].error ? data[0].filter((game, index, self) => index === self.findIndex((t) => t.gameID === game.gameID)) : [];

      setUniqueInterestingGames(unique);

      handleFilter();
    };

    fetchListDeals();
  }, [page]);

  useEffect(() => {
    if (InterestingGames) {
      let uniqueFilter =
        InterestingGames[0] && !InterestingGames[0].error
          ? InterestingGames[0].filter((game, index, self) => index === self.findIndex((t) => t.gameID === game.gameID))
          : [];

      setFilteredInterestingGames(uniqueFilter);

      console.log(filteredInterestingGames);
    }
  }, [InterestingGames]);

  /////////////////////////////////////////////
  // PAGINATION LOGIC
  /////////////////////////////////////////////

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 0)); // No permitir que la página sea menor a 0
  };

  // FILTERS LOGIC

  const handleFilter = () => {
    const fetchListDealsFilter = async () => {
      const promises = [];
      promises.push(
        getAllNewDealsFilter(
          priceLimit,
          radioSelectedOption,
          Number(checkboxes.checkbox1),
          Number(checkboxes.checkbox2),
          Number(checkboxes.checkbox3),
          page
        )
      );
      const response = await Promise.all(promises);

      const data = [];
      response.forEach((res) => {
        data.push(res);
      });

      console.log(data);

      setInterestingGames(data);
    };

    if (
      (uniqueInterestingGames && uniqueInterestingGames.length > 0) ||
      radioSelectedOption ||
      Object.values(checkboxes).some((checkbox) => checkbox === true)
    ) {
      fetchListDealsFilter();
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
    setFilteredInterestingGames(uniqueInterestingGames);
    setPriceLimit(50);
    setRadioSelectedOption("2500");
    setCheckboxes({
      checkbox1: false,
      checkbox2: false,
      checkbox3: false,
    });
  };

  return (
    <>
      <div className="newDeals__bg-presentation-overlay pt-4 d-flex align-items-center justify-content-center">
        <div className="text-white">
          <h1 className="pt-5 fw-bold mb-5 newDeals__h1--title">New deals</h1>
        </div>
      </div>

      <div className="container mx-auto row justify-content-center mt-5">
        <div className="col-lg-3 col-md-9 text-white mb-lg-0 mb-5">
          <div className="p-3 bg-black rounded">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="fw-bold">FILTERS</h3>
              <i className="fas fa-filter me-2"></i>
            </div>
            <div className="my-4">
              <h4>Price</h4>
              <label className="slider w-100 text-center">
                <OverlayTrigger placement="right" overlay={<Tooltip id={`tooltip-right`}>50 acts the same as no limit</Tooltip>}>
                  <span>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      className="level"
                      value={priceLimit}
                      onInput={(event) => {
                        event.target.nextElementSibling.value = event.target.value;
                        setPriceLimit(event.target.value);
                      }}
                    />
                    Limit Price: <output>{priceLimit}</output>€
                  </span>
                </OverlayTrigger>
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
                    value="2500"
                    checked={radioSelectedOption === "2500"}
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
              <button className="btn btn-secondary me-xl-3 me-md-2 me-3" onClick={cleanFilter}>
                Clean filters
              </button>
              <button className="btn btn-primary" onClick={handleFilter}>
                Filter
              </button>
            </div>
          </div>
        </div>
        <div className="col-xl-9 col-lg-9 col-md-12 col-12">
          {isLoading && <Loading />}
          {filteredInterestingGames && <ListCards filteredGames={filteredInterestingGames} setIsLoading={setIsLoading} />}
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
      <ToastContainer position="bottom-center" pauseOnFocusLoss={false} />
    </>
  );
}
