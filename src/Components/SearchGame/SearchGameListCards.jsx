import React from "react";
import SearchGameCard from "./SearchGameCard";

export default function ListCards({ games }) {
  let uniqueGames =
    games && !games.error ? games.filter((game, index, self) => index === self.findIndex((t) => t.gameID === game.gameID)) : [];

  return (
    <div className="row">
      {uniqueGames.map((game) => {
        return <SearchGameCard game={game} key={game.gameID} />;
      })}
      ;
    </div>
  );
}
