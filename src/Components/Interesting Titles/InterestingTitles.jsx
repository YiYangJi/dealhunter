import React, { useEffect, useRef, useState } from "react";
import "../Interesting Titles/InterestingTitles.css";
import { getListDeals } from "../../Services/file";
import InterestingTitlesCard from "./InterestingTitlesCard";

import { Tooltip, OverlayTrigger } from "react-bootstrap";

export default function InterestingTitles() {
  const [games, setGames] = useState([]);
  const [uniqueGames, setUniqueGames] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchListDeals = async () => {
      const promises = [];
      promises.push(getListDeals());
      const response = await Promise.all(promises);

      const data = [];
      response.forEach((res) => {
        data.push(res);
      });

      setGames(data);
    };

    fetchListDeals();
  }, []);

  useEffect(() => {
    if (games) {
      let unique =
        games[0] && !games[0].error
          ? games[0].filter((game, index, self) => index === self.findIndex((t) => t.gameID === game.gameID))
          : [];

      setUniqueGames(unique);
    }
  }, [games]);

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
              <label class="slider w-100 text-center">
                <input
                  type="range"
                  min="0"
                  max="200"
                  class="level"
                  onInput={(event) => {
                    event.target.nextElementSibling.value = event.target.value;
                  }}
                />
                <output>50</output>€
              </label>
            </div>

            <div className="my-4">
              <h4>Offer date</h4>

              <div class="radio-buttons-container">
                <div class="radio-button">
                  <input name="radio-group" id="radio2" class="radio-button__input" type="radio" />
                  <label for="radio2" class="radio-button__label">
                    <span class="radio-button__custom"></span>
                    All offers
                  </label>
                </div>
                <div class="radio-button">
                  <input name="radio-group" id="radio1" class="radio-button__input" type="radio" />
                  <label for="radio1" class="radio-button__label">
                    <span class="radio-button__custom"></span>
                    Last 24h offers
                  </label>
                </div>
                <div class="radio-button">
                  <input name="radio-group" id="radio3" class="radio-button__input" type="radio" />
                  <label for="radio3" class="radio-button__label">
                    <span class="radio-button__custom"></span>
                    Last week offers
                  </label>
                </div>
                <div class="radio-button">
                  <input name="radio-group" id="radio4" class="radio-button__input" type="radio" />
                  <label for="radio4" class="radio-button__label">
                    <span class="radio-button__custom"></span>
                    Last month offers
                  </label>
                </div>
              </div>
            </div>

            <div className="my-4">
              <div class="checkbox-wrapper-4">
                <input type="checkbox" id="aaa" class="inp-cbx" />
                <label for="aaa" class="cbx ps-0 pb-1">
                  <span>
                    {" "}
                    <svg height="10px" width="12px"></svg>
                  </span>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip id={`tooltip-right`}>Filters out games with a current retail price 29€</Tooltip>}>
                    <span> AAA</span>
                  </OverlayTrigger>
                </label>
                <svg class="inline-svg">
                  <symbol viewBox="0 0 12 10" id="check-4">
                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                  </symbol>
                </svg>
              </div>
              <div class="checkbox-wrapper-4">
                <input type="checkbox" id="steamWorks" class="inp-cbx" />
                <label for="steamWorks" class="cbx ps-0 pb-1">
                  <span>
                    {" "}
                    <svg height="10px" width="12px"></svg>
                  </span>
                  <OverlayTrigger
                    placement="right"
                    overlay={
                      <Tooltip id={`tooltip-right`}>
                        Games that register and download on Steam regardless of which store you buy them from.
                      </Tooltip>
                    }>
                    <span> SteamWorks</span>
                  </OverlayTrigger>
                </label>
                <svg class="inline-svg">
                  <symbol viewBox="0 0 12 10" id="check-4">
                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                  </symbol>
                </svg>
              </div>

              <div class="checkbox-wrapper-4">
                <input type="checkbox" id="onsale" class="inp-cbx" />
                <label for="onsale" class="cbx ps-0 pb-1">
                  <span>
                    {" "}
                    <svg height="10px" width="12px"></svg>
                  </span>
                  <OverlayTrigger
                    placement="right"
                    overlay={
                      <Tooltip id={`tooltip-right`}>
                        Games that register and download on Steam regardless of which store you buy them from.
                      </Tooltip>
                    }>
                    <span> On sale</span>
                  </OverlayTrigger>
                </label>
                <svg class="inline-svg">
                  <symbol viewBox="0 0 12 10" id="check-4">
                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                  </symbol>
                </svg>
              </div>
            </div>
            <div className="text-center mt-3">
              <button className="btn btn-secondary me-3">Clean filters</button>
              <button className="btn btn-primary">Filter</button>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          {uniqueGames &&
            uniqueGames.map((game) => {
              return <InterestingTitlesCard game={game} key={game.gameID} />;
            })}
        </div>
      </div>
    </>
  );
}
