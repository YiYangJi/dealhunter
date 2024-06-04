// Importa la libreria de React
import React from "react";

import GameCard from "./GameCard"; // Importa el componente GameCard
import Loading from "../Loading/Loading";

// Define y exporta el componente ListCards que recibe los parámetros filteredGames y setIsLoading
export default function ListCards({ filteredGames, isLoading }) {
  if (isLoading) {
    return <Loading />;
  } else {
    return (
      // Si filteredGames existe, mapea cada juego
      filteredGames &&
      filteredGames.map((game) => {
        // Retorna el componente GameCard con los parámetros game y setIsLoading y la key game.gameID
        return <GameCard game={game} key={game.gameID} />;
      })
    );
  }
}
