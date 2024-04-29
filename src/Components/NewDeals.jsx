import React from "react";

export default function BestDeals({ newDeals }) {
  console.log(newDeals);

  return (
    <>
      {newDeals[0].map((game) => (
        <a href="#" className="text-decoration-none">
          <div className="card bg-black text-light rounded-0 border-bottom mx-auto" style={{ maxWidth: "500px", maxHeight: "45px" }}>
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
                  <div className="col-md-9 col-8">
                    <p className="card-text text-truncate m-0 ms-2" title={game.title}>
                      {game.title}
                    </p>
                  </div>
                  <div className="col-md-3 col-4">
                    <p className="m-0">
                      <span className="fw-bold fs-5">{game.salePrice}€</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>
      ))}
    </>
  );
}
