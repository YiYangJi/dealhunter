// Importa las librerías de React
import React, { useEffect, useState } from "react";

import { searchGame } from "../../Services/AsyncFunctions"; // Importa las funciones asíncronas
import "./GameCard.css"; // Importa el css de GameCard
import { Link } from "react-router-dom"; // Importa la función Link de react-router-dom

// Define y exporta el componente GameCard con los parámetros game y setIsLoading
export default function GameCard({ game, setIsLoading }) {
  const [infoGame, setInfoGame] = useState(null); // Define el useState de infoGame

  // Define la función useEffect
  useEffect(() => {
    // Define una función asincrona llamada fetchImage
    const fetchImage = async () => {
      setIsLoading(true); // Cambia el estado de isLoading a true
      let titleResults;

      try {
        titleResults = await searchGame(game.title); // Llama a la función searchGame con el título del juego
      } catch (error) {
        console.error("Error fetching data from RAWG API", error);
        setInfoGame(backupImage); // Cambia el estado de infoGame a backupImage
        setIsLoading(false); // Cambia el estado de isLoading a false
        return; // Retorna
      }

      let gameResult = [];

      // Si titleResults.results[0] existe
      if (titleResults.results[0]) {
        gameResult.push(titleResults.results[0]); // Añade titleResults.results[0] a gameResult
      }

      setInfoGame(gameResult[0]); // Almacena la información del juego en infoGame
      setIsLoading(false); // Cambia el estado de isLoading a false
    };

    fetchImage(); // Ejecuta la función fetchImage
  }, []);

  const backupImage = "/dealhunter/img/logo_DealHunter-bg.png"; // Imagen de respaldo en caso de error

  // Función para manejar errores en la carga de imágenes
  const handleError = (e) => {
    e.target.onerror = null; // Elimina cualquier otro manejador de errores
    e.target.src = backupImage; // Establece la imagen de respaldo
  };

  return (
    <div className="col-md-12 mb-md-3 mt-lg-0 mb-4 mt-0">
      <Link to={`/game/${game.gameID}`} className="text-decoration-none" onClick={() => window.scrollTo(0, 0)}>
        <div className="card bg-black text-white">
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={infoGame && infoGame.background_image ? infoGame.background_image : backupImage}
                className="img-fluid rounded-start gameCard__img--height w-100"
                alt={game.title}
                onError={handleError}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <div className="row">
                  <div className="col-xl-7 col-lg-8 col-md-8 col-sm-8 col-12">
                    <h5 className="card-title fs-5">{game.title}</h5>
                    <p className="text-secondary m-0">
                      Release Date:{" "}
                      <span className="text-white">{infoGame && infoGame.released ? infoGame.released : "Failed to load resource"}</span>
                    </p>
                    <p className="text-secondary m-0">
                      Genres:{" "}
                      <span className="text-white">
                        {/* Si exsiste los generos de infoGame, se mapea para mostrar los nombres separados por ", " */}
                        {infoGame && infoGame.genres ? infoGame.genres.map((genre) => genre.name).join(", ") : ""}
                      </span>
                    </p>
                    <div className="container p-0 pt-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="gameCard__ratings">
                          {/* Si existe el rating de InfoGame y es mayor que 0, se crea un nuevo Array */}
                          {infoGame && infoGame.rating && infoGame.rating > 0
                            ? Array.from({ length: Math.round(infoGame.rating) }, (_, i) => (
                                // Se ignora el elemento actual ("_") y solo tiene en cuenta el índice
                                // Para cada elemento, se crea un ícono de estrella con clave igual al índice del elemento
                                <i key={i} className="fa fa-star gameCard__rating--color"></i>
                              ))
                            : // Sino, se crea un array de 5 elementos y se muestran las estrellas vacía
                              Array.from({ length: 5 }, (_, i) => <i key={i} className="fa fa-star"></i>)}

                          {/* Si el rating de InfoGame es menor que 5 y mayor que 0, se crea un nuevo Array de longitud 5 restado al rating redondeado */}
                          {infoGame && infoGame.rating && infoGame.rating < 5 && infoGame.rating > 0
                            ? Array.from({ length: 5 - Math.round(infoGame.rating) }, (_, i) => (
                                // Se ignora el elemento actual ("_") y solo tiene en cuenta el índice
                                // Para cada elemento, se crea un ícono de estrella mas el rating redondeado como estrella vacía
                                <i key={i + Math.round(infoGame.rating)} className="fa fa-star"></i>
                              ))
                            : null}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-5 col-lg-4 col-md-4 col-sm-4 col-12 text-end">
                    <p className="card-text gameCard__p--salePrice fw-bold">~{game.salePrice}€</p>
                    <p className="card-text text-secondary d-sm-block d-none">
                      Original Price: <span className="text-white">{game.normalPrice}€</span>
                    </p>
                    <p className="card-text text-secondary d-sm-block d-none">
                      Discount: <span className="text-white">{Math.round(game.savings)}%</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
