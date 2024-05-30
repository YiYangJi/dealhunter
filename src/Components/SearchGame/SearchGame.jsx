// Importa las librerias de React
import React, { useEffect, useState } from "react";

import { useLocation } from "react-router-dom"; // Importa la libreria useLocation de react-router-dom
import { getListGames } from "../../Services/AsyncFunctions"; // Importa las funciones asíncronas
import SearchGameListCards from "./SearchGameListCards"; // Importa el componente SearchGameListCards

// Importa las librerias de React
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define y exporta el componente SearchGame
export default function SearchGame() {
  const location = useLocation(); // Obtiene la ubicación actual
  const nameGame = decodeURIComponent(location.pathname.split("/")[2]); // Obtiene el nombre del juego desde la URL

  const [relatedGames, setRelatedGames] = useState([]); // Define el useState relatedGames
  const [isLoading, setIsLoading] = useState(false); // Define el useState isLoading

  let toastDisplayed = false; // Variable para controlar la visualización del toast

  // Define un useEffect
  useEffect(() => {
    window.scrollTo(0, 0); // Hace scroll hasta arriba de la página
  }, []);

  // Define una función asíncrona para obtener los juegos relacionados
  const fetchGames = async () => {
    setIsLoading(true); // Cambia el estado de isLoading a true
    try {
      const promises = []; // Define un array de promesas
      promises.push(getListGames(nameGame)); // Añade una promesa al array de promesas
      const response = await Promise.all(promises); // Espera a que todas las promesas se resuelvan

      // Si la respuesta está vacía, devuelve error o contiene un error de límite de peticiones
      if (
        response[0] &&
        !response[0].ok &&
        response[0].error &&
        response[0].error.includes("You are being temporarily blocked due to rate limiting")
      ) {
        // Si no se ha mostrado el toast
        if (!toastDisplayed) {
          // Muestra un toast con un mensaje de error
          toast.error(<div className="text-center">You have made too many requests. Please try again later.</div>);
          toastDisplayed = true; // Cambia el estado de toastDisplayed a true
        }
      }

      const data = []; // Define un array de datos
      // Para cada respuesta
      response.forEach((res) => {
        data.push(res); // Añade la respuesta al array de datos
      });

      let matchingGames = [];

      // Si existen datos
      if (data && data[0]) {
        // Filtra los juegos que coincidan con el nombre del juego que empiecen con lo que ha escrito el usuario
        matchingGames = data[0].filter((game) => game.external.toLowerCase().startsWith(nameGame.toLowerCase()));
      }

      setRelatedGames(matchingGames); // Establece los juegos relacionados
    } catch (error) {
      // Si no se ha mostrado el toast
      if (!toastDisplayed) {
        // Muestra un toast con un mensaje de error
        toast.error("Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.");
        toastDisplayed = true; // Cambia el estado de toastDisplayed a true
      }
    } finally {
      setIsLoading(false); // Cambia el estado de isLoading a false
    }
  };

  // Define un useEffect
  useEffect(() => {
    fetchGames(); // Llama a la función fetchGames
  }, [nameGame]); // Cada vez que cambia el nombre del juego introducido por el usuario

  return (
    <>
      <div className="container mt-5 pt-5">
        {/* Decodificamos el nombre de la URL para que se muestre correctamente al usuario */}
        <h2 className="text-white my-4">Search results for "{decodeURIComponent(nameGame)}"</h2>

        {/* Renderiza el componente SearchGameListCards pasando los juegos relacionados y el estado de carga */}
        <SearchGameListCards games={relatedGames} isLoading={isLoading} />
      </div>
      {/* Renderiza el ToastContainer para las notificaciones */}
      <ToastContainer position="bottom-center" autoClose={2000} closeOnClick pauseOnFocusLoss={false} draggable theme="dark" />
    </>
  );
}
