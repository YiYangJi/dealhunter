import { useEffect, useState } from "react";
import { searchGame, searchGameInfo } from "../Services/file";

export default function GameCard({ game }) {
  const [image, setImage] = useState(null);

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

  console.log(image);

  return (
    <div className="card card-hover border-0">
      <a href={`https://www.cheapshark.com/redirect?dealID=${game.dealID}`} className="text-decoration-none">
        {image && <img className="card-img-top card-img-hover" src={image} alt="Title" />}
      </a>
      <div className="card-body bg-dark text-light rounded-bottom">
        <h4 className="card-title">{game.title}</h4>
        <p className="card-text">{game.salePrice}€</p>
        <p>{game.ID}</p>
      </div>
    </div>
  );
}
