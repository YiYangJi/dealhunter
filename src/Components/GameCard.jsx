import { useEffect, useState } from "react";
import { searchGame } from "../Services/file";
import "./GameCard.css";

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
    <a href={`https://www.cheapshark.com/redirect?dealID=${game.dealID}`} className="text-decoration-none">
      <div className="card position-relative border-0">
        <img className="card-img-top img-fluid object-fit-cover h-100 rounded" src={image} alt="Title" />
        <div className="details text-white w-100 position-absolute bottom-0 overflow-hidden p-2 rounded-bottom">
          <p className="fw-bold lh-lg">{game.title}</p>
          <p className="mt-2">
            {game.salePrice}€
            <br />
            <i>California, USA</i>
          </p>
        </div>
      </div>
    </a>
  );
}
