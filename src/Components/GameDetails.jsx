import React, { useEffect, useState } from "react";

import { storesArray } from "../Services/script";

import "./GameDetails.css";

import { useNavigate, useParams } from "react-router-dom";
import { getInfoGame, searchGame, searchGameInfo } from "../Services/file";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ProgressBar from "react-bootstrap/ProgressBar";

export default function GameDetails() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [gameData, setGameData] = useState(null);
  const [moreGameData, setMoreGameData] = useState(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const data = await getInfoGame(id);

        if (data) {
          setGameData(data);
        }

        let moreData = await searchGame(data.info.title);
        moreData = await searchGameInfo(moreData.results[0].id);

        console.log(moreData);

        if (moreData) {
          setMoreGameData(moreData);
        }
      } catch (error) {
        console.error("Error fetching meal details:", error);
      }
    };

    fetchGameDetails();
  }, [id]);

  function findStoreById(storeId) {
    return storesArray.find((store) => store.storeID === storeId);
  }

  const replaceDescription = (description) => {
    return description.replace(/<br \/>\n(.+)<br \/>\n/g, "<h5 className='mt-4 mb-3'>$1</h5>");
  };

  function renderProgressBar(title, rating) {
    switch (title) {
      case "recommended":
        return <ProgressBar variant="success" now={rating.percent} key={rating.id} />;
      case "exceptional":
        return <ProgressBar variant="info" now={rating.percent} key={rating.id} />;
      case "meh":
        return <ProgressBar variant="warning" now={rating.percent} className="text-black" key={rating.id} />;
      case "skip":
        return <ProgressBar variant="danger" now={rating.percent} key={rating.id} />;
      default:
        return <ProgressBar label={`It has no ratings`} key={rating.id} />;
    }
  }

  function renderRatings(title, rating) {
    switch (title) {
      case "recommended":
        return (
          <div className="col-md-3 col-sm-4 col-6 d-flex align-items-center justify-content-center mb-3" key={rating.id}>
            <div className="row flex-column align-items-center">
              <div className="p-0">
                <i className="fa-solid fa-circle fa-xs me-2 text-success"></i>
                <span>Recommended</span>
              </div>
              <p className="m-0 text-center">{rating.percent}%</p>
            </div>
          </div>
        );
      case "exceptional":
        return (
          <div className="col-md-3 col-sm-4 col-6 d-flex align-items-center justify-content-center mb-3" key={rating.id}>
            <div className="row flex-column align-items-center">
              <div>
                <i className="fa-solid fa-circle fa-xs me-2 text-info"></i>
                <span>Exceptional</span>
              </div>
              <p className="m-0 text-center">{rating.percent}%</p>
            </div>
          </div>
        );
      case "meh":
        return (
          <div className="col-md-3 col-sm-4 col-6 d-flex align-items-center justify-content-center mb-3" key={rating.id}>
            <div className="row flex-column align-items-center">
              <div>
                <i className="fa-solid fa-circle fa-xs me-2 text-warning"></i>
                <span>Meh</span>
              </div>
              <p className="m-0 text-center">{rating.percent}%</p>
            </div>
          </div>
        );
      case "skip":
        return (
          <div className="col-md-3 col-sm-4 col-6 d-flex align-items-center justify-content-center mb-3" key={rating.id}>
            <div className="row flex-column align-items-center">
              <div>
                <i className="fa-solid fa-circle fa-xs me-2 text-danger"></i>
                <span>Skip</span>
              </div>
              <p className="m-0 text-center">{rating.percent}%</p>
            </div>
          </div>
        );
      default:
        return <></>;
    }
  }

  return (
    <>
      <div className="pt-4">
        <div
          className="gameDetails__bg-presentation-overlay d-flex align-items-center justify-content-center"
          style={{
            backgroundImage: moreGameData
              ? `linear-gradient(rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)), url('${moreGameData.background_image}')`
              : "",
            minHeight: "450px",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
          <div className="text-white">
            <h1 className="pt-5 fw-bold mb-5">{gameData && gameData.info ? gameData.info.title : "Loading..."}</h1>
          </div>
        </div>
      </div>

      <div className="container my-4 row justify-content-center mx-auto">
        <div className="col-lg-8 col-md-12 mb-5">
          <Tabs defaultActiveKey="offers" id="uncontrolled-tab-example" className="mb-4 gameDetails__tab--ul fs-5">
            <Tab eventKey="offers" title="Offers" className="text-white">
              <div>
                <div className="row">
                  {gameData &&
                    gameData.deals &&
                    gameData.deals.map((deal) => (
                      <div
                        className="card gameDetails__card--offers bg-black text-light rounded-0 mx-auto p-0 d-flex justify-content-center mb-1"
                        key={deal.dealID}>
                        <div className="row g-0 align-items-center">
                          <div className="col-2">
                            <div className="w-75 mx-auto">
                              <img src={`/img/stores/${findStoreById(deal.storeID).banner}`} alt="Store Banner" className="img-fluid" />
                            </div>
                          </div>
                          <div className="col-10">
                            <div className="row justify-content-between align-items-center">
                              <div className="col-xl-6 col-lg-7 col-md-5 col-sm-7 col-5">
                                <p className="card-text text-truncate m-0 ms-2 gameDetails__p--responsive" title={gameData.info.title}>
                                  {gameData.info.title}
                                </p>
                              </div>
                              <div className="col-xl-2 col-lg-3 col-md-3 col-sm-3 col-4 p-0">
                                <p className="m-0 text-end">
                                  {deal.retailPrice === deal.price ? (
                                    <span className="fw-bold gameDetails__price--responsive">{deal.price}€</span>
                                  ) : (
                                    <>
                                      <span className="text-decoration-line-through text-secondary gameDetails__offerPrice--responsive">
                                        {deal.retailPrice}€
                                      </span>
                                      <span className="fw-bold gameDetails__price--responsive">{deal.price}€</span> <br />
                                      <span className="text-secondary fst-italic gameDetails__offerPrice--responsive">
                                        -{Math.round(deal.savings)}%
                                      </span>
                                    </>
                                  )}
                                </p>
                              </div>
                              <div className="col-xl-4 col-lg-2 col-md-4 col-sm-2 col-3">
                                <div className="m-0 text-center me-2">
                                  <a
                                    href={`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`}
                                    target="_blank"
                                    className="btn btn-primary gameDetails__p--responsive"
                                    rel="noreferrer">
                                    <div className="d-flex justify-content-between align-items-center">
                                      <span className="d-md-block d-lg-none d-xl-block d-none me-2">Take a look!</span>
                                      <i className="fa-solid fa-up-right-from-square"></i>
                                    </div>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </Tab>
            <Tab eventKey="about" title="About" className="text-white">
              <h2 className="mb-4">About "{gameData && gameData.info ? gameData.info.title : "Loading..."}"</h2>
              <img src={moreGameData ? moreGameData.background_image : "Loading..."} alt="" className="img-fluid mb-3 w-100" />
              {moreGameData && moreGameData.description && (
                <div className="bg-black p-4" dangerouslySetInnerHTML={{ __html: replaceDescription(moreGameData.description) }} />
              )}

              <h2 className="mt-5 mb-4">Rating</h2>
              <ProgressBar>
                {moreGameData && moreGameData.ratings && moreGameData.ratings.map((rating) => renderProgressBar(rating.title, rating))}
              </ProgressBar>
              <div className="mt-3 row justify-content-center">
                {moreGameData && moreGameData.ratings && moreGameData.ratings.map((rating) => renderRatings(rating.title, rating))}
              </div>

              <h2 className="mt-5 mb-4">PC Requirements</h2>
              <div className="bg-black p-4">
                <div>
                  {moreGameData &&
                    moreGameData.platforms &&
                    moreGameData.platforms.map(
                      (platform) =>
                        platform.platform.name === "PC" &&
                        platform.requirements &&
                        platform.requirements.minimum &&
                        platform.requirements.minimum.split("\n").map((line, index) => {
                          const words = line.split(" ");
                          return (
                            <p key={index}>
                              {words[0] === "Minimum:" ? <span className="fs-4 fw-bold">{words[0]}</span> : words[0]}
                              {" " + words.slice(1).join(" ")}
                            </p>
                          );
                        })
                    )}
                </div>

                <div className="mt-5">
                  {moreGameData &&
                    moreGameData.platforms &&
                    moreGameData.platforms.map(
                      (platform) =>
                        platform.platform.name === "PC" &&
                        platform.requirements &&
                        platform.requirements.recommended &&
                        platform.requirements.recommended.split("\n").map((line, index) => {
                          const words = line.split(" ");
                          return (
                            <p key={index}>
                              {words[0] === "Recommended:" ? <span className="fs-4 fw-bold">{words[0]}</span> : words[0]}
                              {" " + words.slice(1).join(" ")}
                            </p>
                          );
                        })
                    )}
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
        <div className="col-lg-4 col-md-12 ">
          <div className="card border-0 rounded-0 bg-black text-white sticky-top top-25 gameDetails__card">
            {console.log(gameData)}
            <img
              className="card-img-top img-fluid rounded-0"
              src={moreGameData ? moreGameData.background_image_additional : ""}
              alt="Title"
            />
            <div className="card-body px-4 pt-4 pb-0">
              <div className="card-text row mb-4">
                <div className="col-lg-5 col-md-4 col-sm-4 col-4">
                  <span className="text-secondary">Release Date:</span>
                </div>
                <div className="col-lg-7 col-md-8 col-sm-8 col-8">
                  <span>{moreGameData ? moreGameData.released : ""}</span>
                </div>
              </div>
              <div className="card-text row mb-4">
                <div className="col-lg-5 col-md-4 col-sm-4 col-4">
                  <span className="text-secondary">Developers:</span>
                </div>
                <div className="col-lg-7 col-md-8 col-sm-8 col-8">
                  <span>{moreGameData && moreGameData.developers ? moreGameData.developers[0].name : ""}</span>
                </div>
              </div>
              <div className="card-text row mb-4">
                <div className="col-lg-5 col-md-4 col-sm-4 col-4">
                  <span className="text-secondary">Platforms:</span>
                </div>
                <div className="col-lg-7 col-md-8 col-sm-8 col-8">
                  <span>
                    {moreGameData && moreGameData.parent_platforms
                      ? moreGameData.parent_platforms.map((platform) => platform.platform.name).join(", ")
                      : ""}
                  </span>
                </div>
              </div>

              <div className="card-text row">
                <div className="col-lg-4 col-md-4 col-sm-4 col-4 mt-1">
                  <span className="text-secondary">Genres:</span>
                </div>
                <div className="col-lg-8 col-md-8 col-sm-8 col-8 ps-0">
                  <div className="card-text d-flex flex-wrap">
                    {moreGameData && moreGameData.genres
                      ? moreGameData.genres.map((genre) => (
                          <div className="btn btn-dark text-white mx-2 mb-3 pe-none" key={genre.id}>
                            {genre.name}
                          </div>
                        ))
                      : ""}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
