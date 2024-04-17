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

      setImage(gameResult[0].background_image);
      setInfoGame(dataResult[0]);
    };

    fetchImage();
    console.log(infoGame);
  }, []);

  return (
    <a href={`https://www.cheapshark.com/redirect?dealID=${infoGame}`} className="text-decoration-none">
      <div className="card position-relative border-0">
        <img className="card-img-top img-fluid object-fit-cover h-100 rounded" src={image} alt="Title" />
        <div className="details text-white w-100 position-absolute bottom-0 overflow-hidden p-2 rounded-bottom">
          <p className="fw-bold lh-lg">{infoGame}</p>
          <p className="mt-2">
            {infoGame}€
            <br />
            <i>California, USA</i>
          </p>
        </div>
      </div>
    </a>
  );
}
