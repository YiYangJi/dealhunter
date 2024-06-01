// Importa las librerías de react
import { useEffect, useState } from "react";

import { searchGame } from "../../Services/AsyncFunctions"; // Importa la función searchGame desde AsyncFunctions
import "./HomeGameCard.css"; // Importa los estilos CSS para este componente
import { Link } from "react-router-dom"; // Importa la función Link desde react-router-dom

// Importa las librerías de React Toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define y exporta el componente GameCard pasandole game como parámetro
export default function GameCard({ game, handleToast }) {
  const [image, setImage] = useState(null); // Define un useState para la imagen del juego

  // Define un useEffect que se ejecuta al cargar el componente
  useEffect(() => {
    // Función asíncrona para obtener la imagen del juego
    const fetchImage = async () => {
      let titleResults; // Define una variable titleResults

      try {
        titleResults = await searchGame(game.title); // Llama a la función searchGame pasandole el título del juego

        let gameResult = []; // Define una variable gameResult

        // Si titleResults tiene resultados
        if (titleResults.results[0]) {
          gameResult.push(titleResults.results[0]); // Añade el primer resultado a gameResult
        }

        setImage(gameResult[0].background_image); // Establece la imagen del juego
      } catch (error) {
        console.error("Error fetching data from RAWG API", error); // Muestra un mensaje de error si no se puede obtener la imagen
        // Muestra un mensaje de error
        setImage(backupImage); // Muestra la imagen de backup
        return;
      }
    };

    fetchImage(); // Llama a la función fetchImage
  }, []);

  const backupImage = "/dealhunter/img/logo_DealHunter-bg.png"; // Define una imagen de backup

  // Maneja el error al cargar la imagen: establece la imagen de respaldo
  const handleError = (e) => {
    e.target.onerror = null;
    e.target.src = backupImage;
  };

  return (
    <>
      <Link to={`/game/${game.gameID}`}>
        <div className="card homeGameCard__card position-relative border-0 m-1 m-md-2">
          <img className="card-img-top img-fluid object-fit-cover rounded" src={image} alt={game.title} onError={handleError} />
          <div className="homeGameCard__details text-white w-100 position-absolute bottom-0 overflow-hidden p-2 rounded-bottom">
            <p className="fw-bold lh-lg homeGameCard__game--name overflow-hidden">{game.title}</p>
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
