import { useEffect, useState } from "react";
import { searchGameInfo, searchGameTitle } from "../Services/file";

export default function GameCard({ game }) {
  const [image, setImage] = useState(null);

  console.log(game);

  useEffect(() => {
    const fetchImage = async () => {
      const titleResult = await searchGameTitle(game.title);
      if (titleResult && titleResult.length > 0) {
        const infoResult = await searchGameInfo(titleResult[0].id);
        setImage(infoResult.assets.banner600);
      }
    };

    fetchImage();
  }, []);

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

// COMO LOS NOMBRES DE LOS JUEGOS SON DIFERENTES EN LAS 2 APIS, EL NOMBRE DEL JUEGO
// DE CHEAPSHARK LO OBTENEMOS Y LO TENEMOS QUE PASAR A MINSUCULAS CON
//GUIONES PARA QUE COINCIDA CON EL SLUG DE LA APUI DE ISTHEREANYDEAL
