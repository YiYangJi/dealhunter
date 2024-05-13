import React, { useEffect, useState } from "react";
import { searchGame } from "../../Services/file";
import "./InterestingTitlesCard.css";
import { Link } from "react-router-dom";

export default function InterestingTitlesCard({ game }) {
  const [image, setImage] = useState(null);

  console.log("not working");

  useEffect(() => {
    const fetchImage = async () => {
      let titleResults;

      try {
        titleResults = await searchGame(game.title);
      } catch (error) {
        console.error("Error fetching data from RAWG API", error);
        setImage(backupImage);
        return;
      }

      let gameResult = [];

      if (titleResults.results[0]) {
        gameResult.push(titleResults.results[0]);
      }

      setImage(gameResult[0]);
    };

    fetchImage();
  }, []);

  const backupImage = "/logo_DealHunter-bg.png";

  const handleError = (e) => {
    e.target.onerror = null;
    e.target.src = backupImage;
  };

  return (
    <div className="col-md-12">
      <Link to={`/game/${game.gameID}`} className="text-decoration-none" onClick={() => window.scrollTo(0, 0)}>
        <div class="card mb-3 bg-black text-white">
          <div class="row g-0">
            <div class="col-md-4">
              <img
                src={image && image.background_image ? image.background_image : backupImage}
                className="img-fluid rounded-start interestingTitles__img--height w-100 h-100"
                alt={game.title}
                onError={handleError}
              />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <div className="row">
                  <div className="col-5">
                    <h5 class="card-title fs-5">{game.title}</h5>
                    <p className="text-secondary m-0">
                      Release Date: <span className="text-white">{image && image.released ? image.released : "Loading..."}</span>
                    </p>
                    <p className="text-secondary m-0">
                      Genres:{" "}
                      <span className="text-white">{image && image.genres ? image.genres.map((genre) => genre.name).join(", ") : ""}</span>
                    </p>
                    <div class="container p-0 pt-3">
                      <div class="d-flex justify-content-between align-items-center">
                        <div class="ratings">
                          {image &&
                            image.rating &&
                            Array.from({ length: Math.round(image.rating) }, (_, i) => <i key={i} class="fa fa-star rating-color"></i>)}
                          {image &&
                            image.rating &&
                            Array.from({ length: 5 - Math.round(image.rating) }, (_, i) => (
                              <i key={i + Math.round(image.rating)} class="fa fa-star"></i>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-7 text-end">
                    <p class="card-text interestingTitles__p--salePrice fw-bold">~{game.salePrice}€</p>
                    <p class="card-text text-secondary">
                      Original Price: <span className="text-white">{game.normalPrice}€</span>
                    </p>
                    <p class="card-text text-secondary">
                      Discount: <span className="text-white">{Math.round(game.savings)}%</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
