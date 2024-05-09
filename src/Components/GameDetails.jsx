import React, { useEffect, useState } from "react";

import { storesArray } from "../Services/script";

import "./GameDetails.css";

import { useNavigate, useParams } from "react-router-dom";
import { getInfoGame, searchGame, searchGameInfo } from "../Services/file";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ProgressBar from "react-bootstrap/ProgressBar";

// export default function CardDetails() {
//   const navigate = useNavigate();

//   const { id } = useParams();

//   const [gameData, setGameData] = useState(null);
//   const [moreGameData, setMoreGameData] = useState(null);

//   useEffect(() => {
//     const fetchGameDetails = async () => {
//       try {
//         const data = await getInfoGame(id);

//         if (data) {
//           setGameData(data);
//         }

//         let moreData = await searchGame(data.info.title);
//         moreData = await searchGameInfo(moreData.results[0].id);

//         console.log(moreData);

//         if (moreData) {
//           setMoreGameData(moreData);
//         }
//       } catch (error) {
//         console.error("Error fetching meal details:", error);
//       }
//     };

//     fetchGameDetails();
//   }, [id]);

//   return (
//     <>
//       <div className="pt-4">
//         <div
//           className="gameDetails__bg-presentation-overlay d-flex align-items-center justify-content-center"
//           style={{
//             backgroundImage: moreGameData
//               ? `linear-gradient(rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)), url('${moreGameData.background_image}')`
//               : "",
//             minHeight: "450px",
//             backgroundRepeat: "no-repeat",
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}>
//           <div className="text-white">
//             <h1 className="pt-5 fw-bold mb-5">{gameData ? gameData.info.title : "Loading..."}</h1>
//           </div>
//         </div>
//       </div>

//       <div className="container row mt-5 mx-auto">
//         <div className="col-8"></div>
//         <div className="col-4">
//           <div className="card border-0 bg-dark text-white">
//             {console.log(gameData)}
//             <img
//               className="card-img-top img-fluid rounded-0"
//               src={moreGameData ? moreGameData.background_image_additional : ""}
//               alt="Title"
//             />
//             <div className="card-body">
//               <p className="card-text">Release Date: {moreGameData ? moreGameData.released : ""}</p>
//               <p className="card-text">Developers: {moreGameData ? moreGameData.developers.name : ""}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

export default function GameDetails() {
  const [gameData, setGameData] = useState(null);
  const [moreGameData, setMoreGameData] = useState(null);

  const fetchGameDetails = async () => {
    try {
      const response = await fetch("https://85b5a476-fea3-457b-8766-a09dfe8843ba.mock.pstmn.io/cheapshark");
      const data = await response.json();

      console.log(data);

      if (data) {
        setGameData(data);
      }

      // const moreResponse = await fetch("https://64582aaa-1973-4d00-b8d0-218f92bc2acd.mock.pstmn.io/rawg");
      const moreResponse = await fetch("https://api.rawg.io/api/games/366865?key=0cb8ccfd500641c593b6cb7186c66c13");
      const moreData = await moreResponse.json();

      console.log(moreData);

      if (moreData) {
        setMoreGameData(moreData);
      }
    } catch (error) {
      console.error("Error fetching meal details:", error);
    }
  };

  useEffect(() => {
    fetchGameDetails();
  }, []);

  function findStoreById(storeId) {
    return storesArray.find((store) => store.storeID === storeId);
  }

  const replaceDescription = (description) => {
    return description.replace(/<br \/>\n(.+)<br \/>\n/g, "<h5 class='mt-4 mb-3'>$1</h5>");
  };

  function renderProgressBar(title, rating) {
    switch (title) {
      case "recommended":
        return <ProgressBar variant="success" now={rating.percent} label={`${rating.percent}%`} key={1} />;
      case "exceptional":
        return <ProgressBar variant="info" now={rating.percent} label={`${rating.percent}%`} key={2} />;
      case "meh":
        return <ProgressBar variant="warning" now={rating.percent} label={`${rating.percent}%`} className="text-black" key={3} />;
      case "skip":
        return <ProgressBar variant="danger" now={rating.percent} label={`${rating.percent}%`} key={4} />;
      default:
        return <ProgressBar label={`It has no ratings`} key={5} />;
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

      <div className="container my-4 row mx-auto">
        <div className="col-8">
          <Tabs defaultActiveKey="offers" id="uncontrolled-tab-example" className="mb-3">
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
                            <div className="row justify-content-between align-items-center me-4">
                              <div className="col-xl-6 col-lg-5 col-md-9 col-sm-9 col-8">
                                <p className="card-text text-truncate m-0 ms-2" title={gameData.info.title}>
                                  {gameData.info.title}
                                </p>
                              </div>
                              <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-4">
                                <p className="m-0 text-end">
                                  {deal.retailPrice === deal.price ? (
                                    <span className="fw-bold fs-5">{deal.price}€</span>
                                  ) : (
                                    <>
                                      <span className="text-decoration-line-through text-secondary">{deal.retailPrice}€</span>
                                      <span className="fw-bold fs-5">{deal.price}€</span> <br />
                                      <span className="fs-6 text-secondary fst-italic">-{Math.round(deal.savings)}%</span>
                                    </>
                                  )}
                                </p>
                              </div>
                              <div className="col-xl-3 col-lg-4">
                                <p className="m-0 text-end">
                                  <a
                                    href={`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`}
                                    target="_blank"
                                    className="btn btn-primary"
                                    rel="noreferrer">
                                    Take a look!
                                    <i class="fa-solid fa-up-right-from-square"></i>
                                  </a>
                                </p>
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
              <img src={moreGameData ? moreGameData.background_image : "Loading..."} alt="" className="img-fluid mb-3" />
              {moreGameData && moreGameData.description && (
                <div className="bg-black p-4" dangerouslySetInnerHTML={{ __html: replaceDescription(moreGameData.description) }} />
              )}

              <h2 className="mt-5 mb-4">Rating</h2>
              <ProgressBar>
                {moreGameData && moreGameData.ratings && moreGameData.ratings.map((rating) => renderProgressBar(rating.title, rating))}
              </ProgressBar>
              <div className="mt-3 row">
                <div className="col-3 d-flex align-items-center justify-content-center">
                  <i class="fa-solid fa-circle fa-xs me-2 text-success"></i>
                  <span>Recommended</span>
                </div>
                <div className="col-3 d-flex align-items-center justify-content-center">
                  <i class="fa-solid fa-circle fa-xs me-2 text-warning"></i>
                  <span>Meh</span>
                </div>
                <div className="col-3 d-flex align-items-center justify-content-center">
                  <i class="fa-solid fa-circle fa-xs me-2 text-info"></i>
                  <span>Exceptional</span>
                </div>
                <div className="col-3 d-flex align-items-center justify-content-center">
                  <i class="fa-solid fa-circle fa-xs me-2 text-danger"></i>
                  <span>Skip</span>
                </div>
              </div>

              <h2 className="mt-5 mb-4">PC Requirements</h2>
              <div className="bg-black p-4">
                <p>
                  {moreGameData &&
                    moreGameData.platforms &&
                    moreGameData.platforms.map((platform) => platform.platform.name === "PC" && platform.requirements.minimum)}
                </p>

                <p>
                  {moreGameData &&
                    moreGameData.platforms &&
                    moreGameData.platforms.map((platform) => platform.platform.name === "PC" && platform.requirements.recommended)}
                </p>
              </div>

              <h3 className="mt-5 mb-4 text-secondary">Tags</h3>
              <p className="card-text d-flex flex-wrap">
                {moreGameData && moreGameData.tags
                  ? moreGameData.tags.map((tag) => <div className="btn btn-secondary text-white mx-2 mb-3 pe-none">{tag.name}</div>)
                  : ""}
              </p>
            </Tab>
          </Tabs>
        </div>
        <div className="col-4">
          <div className="card border-0 rounded-0 bg-black text-white sticky-top top-25 gameDetails__card">
            {console.log(gameData)}
            <img
              className="card-img-top img-fluid rounded-0"
              src={moreGameData ? moreGameData.background_image_additional : ""}
              alt="Title"
            />
            <div className="card-body px-4 pt-4 pb-0">
              <p className="card-text row">
                <div className="col-4">
                  <span className="text-secondary">Release Date:</span>
                </div>
                <div className="col-6">
                  <span>{moreGameData ? moreGameData.released : ""}</span>
                </div>
              </p>
              <p className="card-text row">
                <div className="col-4">
                  <span className="text-secondary">Developers:</span>
                </div>
                <div className="col-8">
                  <span>{moreGameData && moreGameData.developers ? moreGameData.developers[0].name : ""}</span>
                </div>
              </p>
              <p className="card-text row">
                <div className="col-4">
                  <span className="text-secondary">Platforms:</span>
                </div>
                <div className="col-8">
                  <span>
                    {moreGameData && moreGameData.parent_platforms
                      ? moreGameData.parent_platforms.map((platform) => platform.platform.name).join(", ")
                      : ""}
                  </span>
                </div>
              </p>

              <p className="card-text d-flex flex-wrap">
                {moreGameData && moreGameData.genres
                  ? moreGameData.genres.map((genre) => <div className="btn btn-dark text-white mx-2 mb-3 pe-none">{genre.name}</div>)
                  : ""}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
