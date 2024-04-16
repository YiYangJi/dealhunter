import { useEffect, useState } from "react";
import { searchGame } from "../Services/file";
import "./GameCard.css";

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
    <a href={`https://www.cheapshark.com/redirect?dealID=${game.dealID}`} className="text-decoration-none">
      <div class="card position-relative border-0">
        <img class="card-img-top img-fluid object-fit-cover h-100 rounded" src={image} alt="Title" />
        <div class="details text-white w-100 position-absolute bottom-0 overflow-hidden p-2 rounded-bottom">
          <p class="fw-bold">{game.title}</p>
          <p class="mt-2">
            {game.salePrice}€
            <br />
            <i>California, USA</i>
          </p>
        </div>
      </div>
    </a>
  );
}
