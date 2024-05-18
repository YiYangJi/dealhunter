import { useEffect, useState } from "react";
import { getInfoGame, searchGame } from "../../Services/file";
import { Link } from "react-router-dom";

export default function GameCard({ game }) {
  const [image, setImage] = useState(null);
  const [infoGame, setInfoGame] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      const data = await getInfoGame(game.gameID);
      let dataResult = [];
      dataResult.push(data);

      const titleResults = await searchGame(dataResult[0].info.title);
      let gameResult = [];
      if (titleResults.results[0] && titleResults.results[0].id !== data.id) {
        gameResult.push(titleResults.results[0]);
      }

      setImage(gameResult[0]);
      setInfoGame(dataResult[0]);
    };

    fetchImage();
  }, []);

  const backupImage = "/logo_DealHunter-bg.png";

  const handleError = (e) => {
    e.target.onerror = null;
    e.target.src = backupImage;
  };

  return (
    <div className="col-md-12 mb-md-3 mt-lg-0 mb-4 mt-0">
      <Link to={`/game/${game.gameID}`} className="text-decoration-none" onClick={() => window.scrollTo(0, 0)}>
        <div className="card bg-black text-white">
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={image && image.background_image ? image.background_image : backupImage}
                className="img-fluid rounded-start interestingTitles__img--height w-100"
                alt={infoGame ? infoGame.info.title : ""}
                onError={handleError}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <div className="row">
                  <div className="col-xl-7 col-lg-8 col-md-8 col-sm-8 col-12">
                    <h5 className="card-title fs-5">{infoGame && infoGame.info ? infoGame.info.title : ""}</h5>
                    <p className="text-secondary m-0">
                      Release Date: <span className="text-white">{image && image.released ? image.released : "Loading..."}</span>
                    </p>
                    <p className="text-secondary m-0">
                      Genres:{" "}
                      <span className="text-white">{image && image.genres ? image.genres.map((genre) => genre.name).join(", ") : ""}</span>
                    </p>
                    <div className="container p-0 pt-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="ratings">
                          {image && image.rating && image.rating > 0
                            ? Array.from({ length: Math.round(image.rating) }, (_, i) => (
                                <i key={i} className="fa fa-star rating-color"></i>
                              ))
                            : Array.from({ length: 5 }, (_, i) => <i key={i} className="fa fa-star"></i>)}
                          {image && image.rating && image.rating < 5 && image.rating > 0
                            ? Array.from({ length: 5 - Math.round(image.rating) }, (_, i) => (
                                <i key={i + Math.round(image.rating)} className="fa fa-star"></i>
                              ))
                            : null}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-5 col-lg-4 col-md-4 col-sm-4 col-12 text-end">
                    <p className="card-text interestingTitles__p--salePrice fw-bold">~{infoGame ? infoGame.deals[0].price : ""}€</p>
                    <p className="card-text text-secondary d-sm-block d-none">
                      Original Price: <span className="text-white">{infoGame ? infoGame.deals[0].retailPrice : ""}€</span>
                    </p>
                    <p className="card-text text-secondary d-sm-block d-none">
                      Discount: <span className="text-white">{Math.round(infoGame ? infoGame.deals[0].savings : "")}%</span>
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