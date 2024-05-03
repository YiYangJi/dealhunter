import { useEffect, useState } from "react";
import { searchGame } from "../Services/file";
import "./GameCard.css";
import { Link } from "react-router-dom";

export default function GameCard({ game }) {
  const [image, setImage] = useState(null);

  console.log("not working");

  useEffect(() => {
    const fetchImage = async () => {
      const titleResults = await searchGame(game.title);

      let gameResult = [];

      if (titleResults.results[0]) {
        gameResult.push(titleResults.results[0]);
      }

      setImage(gameResult[0].background_image);
    };

    fetchImage();
  }, []);

  return (
    <>
      <Link to={`/game/${game.gameID}`}>
        <div className="card gameCard__card position-relative border-0 m-1 m-md-2">
          <img className="card-img-top img-fluid object-fit-cover rounded" src={image} alt="Title" />
          <div className="gameCard__details text-white w-100 position-absolute bottom-0 overflow-hidden p-2 rounded-bottom">
            <p className="fw-bold lh-lg gameCard__game-name overflow-hidden">{game.title}</p>
            <p className="pt-1 text-end">
              From:
              <span className="fs-3">{game.salePrice}€</span>
            </p>
          </div>
        </div>
      </Link>
    </>
  );
}
