import { useEffect, useState } from "react";
import { getInfoGame, searchGame } from "../Services/file";
import "./GameCard.css";

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

      console.log(dataResult[0]);

      setImage(gameResult[0].background_image);
      setInfoGame(dataResult[0]);

      console.log(infoGame);
    };

    fetchImage();
  }, []);

  return (
    <div className="col-4 mb-3">
      <a
        href={`https://www.cheapshark.com/redirect?dealID=${infoGame ? infoGame.deals[0].dealID : "Loading---"}`}
        target="_blank"
        className="text-decoration-none"
        rel="noreferrer">
        <div className="card home__card position-relative border-0">
          <img className="card-img-top img-fluid object-fit-cover h-100 rounded" src={image} alt="Title" />
          <div className="home__details text-white w-100 position-absolute bottom-0 overflow-hidden p-2 rounded-bottom">
            <p className="fw-bold lh-lg home__game-name">{infoGame ? infoGame.info.title : "Loading..."}</p>
            <p className="pt-1 text-end">
              From:
              <span className="fs-3 fw-bold"> {infoGame ? infoGame.cheapestPriceEver.price : "Loading..."}€</span>
            </p>
          </div>
        </div>
      </a>
    </div>
  );
}
