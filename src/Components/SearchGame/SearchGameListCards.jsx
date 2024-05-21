import React from "react";
import SearchGameCard from "./SearchGameCard";
import Loading from "../Loading/Loading";

export default function SearchGameListCards({ games, isLoading }) {
  let uniqueGames =
    games && !games.error ? games.filter((game, index, self) => index === self.findIndex((t) => t.gameID === game.gameID)) : [];

  if (isLoading) {
    return <Loading />; // O cualquier otro indicador de carga que prefieras
  } else {
    return (
      <div className="row">
        {uniqueGames.map((game) => {
          return <SearchGameCard game={game} key={game.gameID} />;
        })}
        ;
      </div>
    );
  }
}
