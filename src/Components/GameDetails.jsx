import React, { useEffect, useState } from "react";

import { storesArray } from "../Services/script";

import "./GameDetails.css";

import { useNavigate, useParams } from "react-router-dom";
import { getInfoGame, searchGame, searchGameInfo } from "../Services/file";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

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

      const moreResponse = await fetch("https://64582aaa-1973-4d00-b8d0-218f92bc2acd.mock.pstmn.io/rawg");
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
            <h1 className="pt-5 fw-bold mb-5">{gameData ? gameData.info.title : "Loading..."}</h1>
          </div>
        </div>
      </div>

      <div className="container my-4 row mx-auto">
        <div className="col-8">
          <Tabs defaultActiveKey="offers" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="offers" title="Offers" className="text-white">
              <div className="d-flex flex-column align-items-center mt-2">
                <div className="d-flex align-items-center justify-content-center rounded bg-secondary" style={{ width: "30%" }}>
                  <i className="fa-solid fa-wand-magic-sparkles me-4"></i>
                  <div>
                    HISTORICAL LOW <br />
                    <span className="fs-3 fw-medium me-2">{gameData ? gameData.cheapestPriceEver.price : "Loading..."}€</span>
                    <span className="f">
                      {gameData ? new Date(gameData.cheapestPriceEver.date * 1000).toLocaleDateString() : "Loading..."}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="w-25 mt-5 border-bottom border-3 pb-2">Offers</h3>
                <div className="row">
                  {gameData &&
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
                              <div className="col-lg-3 col-md-3 col-sm-3 col-4">
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
                              <div className="col-xl-3">
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
              About "{gameData ? gameData.info.title : "Loading..."}"
            </Tab>
            <Tab eventKey="requirements" title="Requirements" className="text-white">
              System Requirements
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
                <div className="col-6">
                  <span>{moreGameData ? moreGameData.developers[0].name : ""}</span>
                </div>
              </p>
              <p className="card-text row">
                <div className="col-4">
                  <span className="text-secondary">Platforms:</span>
                </div>
                <div className="col-6">
                  <span>{moreGameData ? moreGameData.parent_platforms.map((platform) => platform.platform.name).join(", ") : ""}</span>
                </div>
              </p>

              <p className="card-text d-flex flex-wrap">
                {moreGameData
                  ? moreGameData.genres.map((genre) => <div className="btn btn-dark text-white mx-2 mb-3">{genre.name}</div>)
                  : ""}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
