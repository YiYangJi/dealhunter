import React from "react";
import "./NewDeals.css";
import { Link } from "react-router-dom";

export default function CardNewDeals({ newDeals }) {
  console.log(newDeals[0]);

  if (!newDeals[0] || !Array.isArray(newDeals[0])) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {newDeals[0].map((game, index) => (
        <Link to={`/game/${game.gameID}`} className="text-decoration-none">
          <div
            className="card newDeals__card bg-black text-light rounded-0 mx-auto"
            style={{
              borderTop: index !== 0 ? "2px solid white" : "none",
            }}>
            <div className="row g-0 align-items-center">
              <div className="col-3">
                <img
                  src={game.thumb}
                  className="img-fluid"
                  alt="Card title"
                  style={{ height: "42px", width: "100%", objectFit: "cover" }}
                />
              </div>
              <div className="col-9">
                <div className="row justify-content-between align-items-center">
                  <div className="col-xl-9 col-lg-8 col-md-9 col-sm-9 col-8">
                    <p className="card-text text-truncate m-0 ms-2" title={game.title}>
                      {game.title}
                    </p>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-3 col-sm-3 col-4">
                    <p className="m-0">
                      <span className="fw-bold fs-5">{game.salePrice}€</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}