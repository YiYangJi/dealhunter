// Importa las librerías de React
import { useEffect, useState } from "react";

import { getInfoGame, searchGame } from "../../Services/AsyncFunctions"; // Importa las funciones asíncronas
import { Link } from "react-router-dom"; // Importa el componente Link de React Router
import "./SearchGameCard.css"; // Importa los estilos CSS

// Define y exporta el componente SearchGameCard con el parámetro game
export default function SearchGameCard({ game }) {
  const [rawgInfoGame, setRawgInfoGame] = useState(null); // Estado para almacenar información específica del juego
  const [infoGame, setInfoGame] = useState(null); // Estado para almacenar información de ofertas del juego

  const [error, setError] = useState(null); // Estado para almacenar un mensaje de error

  // Define un useEffect
  useEffect(() => {
    // Define una función asíncrona
    const fetchImage = async () => {
      const response = await getInfoGame(game.gameID); // Obtiene la información del juego por ID

      let dataResult = [];
      dataResult.push(response); // Almacena la información del juego en el estado dataResult

      let titleResults = [];

      try {
        // Si la información del juego y el título del juego existen
        if (dataResult && dataResult[0] && dataResult[0].info && dataResult[0].info.title) {
          titleResults = await searchGame(dataResult[0].info.title); // Busca el juego por título
        }
      } catch (error) {
        console.error(error);
        setError("Error loading resources. Please try again."); // Establece un mensaje de error
        return;
      }

      let gameResult = [];
      // Si los resultados del título existen y los ID de los resultados no son iguales
      if (titleResults && titleResults.results && titleResults.results[0] && titleResults.results[0].id !== response.id) {
        gameResult.push(titleResults.results[0]); // Almacena los resultados del juego en el estado gameResult
        //Sino
      } else {
        setError("Error loading resources. Please try again."); // Establece un mensaje de error
      }

      setRawgInfoGame(gameResult[0]); // Almacena la información del juego en el estado rawgInfoGame
      setInfoGame(dataResult[0]); // Almacena las ofertas del juego en el estado infoGame
    };

    fetchImage(); // Ejectua la función fetchImage
  }, []);

  const backupImage = "/dealhunter/img/logo_DealHunter-bg.png"; // Establece una imagen de respaldo

  // Define una función para manejar la imagen en caso de que de error
  const handleError = (e) => {
    e.target.onerror = null; // Establece el evento onerror en null
    e.target.src = backupImage; // Establece la imagen de respaldo
  };

  return (
    <div className="col-md-12 mb-md-3 mt-lg-0 mb-4 mt-0">
      <Link to={`/game/${game.gameID}`} className="text-decoration-none" onClick={() => window.scrollTo(0, 0)}>
        <div className="card bg-black text-white">
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={rawgInfoGame && rawgInfoGame.background_image ? rawgInfoGame.background_image : backupImage}
                className="img-fluid rounded-start searchGameCard__img--height w-100"
                alt={infoGame && infoGame.info ? infoGame.info.title : ""}
                onError={handleError}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <div className="row">
                  <div className="col-xl-7 col-lg-8 col-md-8 col-sm-7 col-12">
                    <h5 className="card-title fs-5">{infoGame && infoGame.info ? infoGame.info.title : error}</h5>
                    <p className="text-secondary m-0">
                      Release Date: <span className="text-white">{rawgInfoGame && rawgInfoGame.released ? rawgInfoGame.released : ""}</span>
                    </p>
                    <p className="text-secondary m-0">
                      Genres:{" "}
                      <span className="text-white">
                        {/* Si exsiste los generos de rawgInfoGame, se mapea para mostrar los nombres separados por ", " */}
                        {rawgInfoGame && rawgInfoGame.genres ? rawgInfoGame.genres.map((genre) => genre.name).join(", ") : ""}
                      </span>
                    </p>
                    <div className="container p-0 pt-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="searchGameCard__ratings">
                          {/* Si existe el rating de rawgInfoGame y es mayor que 0, se crea un nuevo Array */}
                          {rawgInfoGame && rawgInfoGame.rating && rawgInfoGame.rating > 0
                            ? Array.from({ length: Math.round(rawgInfoGame.rating) }, (_, i) => (
                                // Se ignora el elemento actual ("_") y solo tiene en cuenta el índice
                                // Para cada elemento, se crea un ícono de estrella con clave igual al índice del elemento
                                <i key={i} className="fa fa-star searchGameCard__rating--color"></i>
                              ))
                            : // Sino, se crea un array de 5 elementos y se muestran las estrellas vacía
                              Array.from({ length: 5 }, (_, i) => <i key={i} className="fa fa-star"></i>)}

                          {/* Si el rating de InfoGame es menor que 5 y mayor que 0, se crea un nuevo Array de longitud 5 restado al rating redondeado */}
                          {rawgInfoGame && rawgInfoGame.rating && rawgInfoGame.rating < 5 && rawgInfoGame.rating > 0
                            ? Array.from({ length: 5 - Math.round(rawgInfoGame.rating) }, (_, i) => (
                                // Se ignora el elemento actual ("_") y solo tiene en cuenta el índice
                                // Para cada elemento, se crea un ícono de estrella con clave igual al índice del elemento
                                <i key={i + Math.round(rawgInfoGame.rating)} className="fa fa-star"></i>
                              ))
                            : null}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-5 col-lg-4 col-md-4 col-sm-5 col-12 text-end">
                    <p className="card-text searchGameCard__p--salePrice fw-bold">
                      ~{infoGame && infoGame.deals && infoGame.deals[0] ? infoGame.deals[0].price : ""}€
                    </p>
                    <p className="card-text text-secondary d-sm-block d-none">
                      Original Price:{" "}
                      <span className="text-white">
                        {infoGame && infoGame.deals && infoGame.deals[0] ? infoGame.deals[0].retailPrice : ""}€
                      </span>
                    </p>
                    <p className="card-text text-secondary d-sm-block d-none">
                      Discount:{" "}
                      <span className="text-white">
                        {Math.round(infoGame && infoGame.deals && infoGame.deals[0] ? infoGame.deals[0].savings : "")}%
                      </span>
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
