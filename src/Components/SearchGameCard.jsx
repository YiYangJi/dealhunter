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

      if (titleResults.results[0]) {
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
    <a
      href={`https://www.cheapshark.com/redirect?dealID=${infoGame ? infoGame.deals[0].dealID : "Loading---"}`}
      target="_blank"
      className="text-decoration-none"
      rel="noreferrer">
      <div className="card position-relative border-0">
        <img className="card-img-top img-fluid object-fit-cover h-100 rounded" src={image} alt="Title" />
        <div className="details text-white w-100 position-absolute bottom-0 overflow-hidden p-2 rounded-bottom">
          <p className="fw-bold lh-lg">{infoGame ? infoGame.info.title : "Loading..."}</p>
          <p className="mt-1">
            Cheapest Price Ever:
            {infoGame ? infoGame.cheapestPriceEver.price : "Loading..."}€
            <br />
            <p className="mt-2">Click for more information</p>
          </p>
        </div>
      </div>
    </a>
  );
}
