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
    <>
      <a href={`https://www.cheapshark.com/redirect?dealID=${game.dealID}`}>
        <div className="card-carrousel position-relative border-0 m-2">
          <img className="card-img-top img-fluid object-fit-cover h-100 rounded rounded" src={image} alt="Title" />
          <div className="details text-white w-100 position-absolute bottom-0 overflow-hidden p-2 rounded-bottom rounded-bottom">
            <p className="fw-bold lh-lg carousel-game-description overflow-hidden">{game.title}</p>
            <p className="pt-1 text-end">
              From:
              <span className="fs-3">{game.salePrice}€</span>€
            </p>
          </div>
        </div>
      </a>
    </>
  );
}
