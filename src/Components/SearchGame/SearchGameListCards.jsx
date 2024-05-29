// Importa la librería de React
import React from "react";

import SearchGameCard from "./SearchGameCard"; // Importa el componente SearchGameCard
import Loading from "../Loading/Loading"; // Importa el componente Loading

// Define y exporta la función SearchGameListCards con los parámetros games e isLoading
export default function SearchGameListCards({ games, isLoading }) {
  // Filtra los juegos únicos
  let uniqueGames =
    games && !games.error ? games.filter((game, index, self) => index === self.findIndex((element) => element.gameID === game.gameID)) : [];

  // Si isLoading es true, muestra un indicador de carga
  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <div className="row">
        {/* Mapea cada juego único a un componente SearchGameCard pasandole game como prop y gameID como key */}
        {uniqueGames.map((game) => {
          return <SearchGameCard game={game} key={game.gameID} />;
        })}
      </div>
    );
  }
}
