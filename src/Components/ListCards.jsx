import React from "react";
import GameCard from "./GameCard";
import SearchGameCard from "./SearchGameCard";

export default function ListCards({ games }) {
  let uniqueGames =
    games && games[0] && !games[0].error
      ? games[0].filter((game, index, self) => index === self.findIndex((t) => t.gameID === game.gameID))
      : [];

  console.log(uniqueGames);

  return (
    <div className="row">
      {uniqueGames.map((game) => {
        return game.title !== undefined ? <GameCard game={game} key={game.gameID} /> : <SearchGameCard game={game} key={game.gameID} />;
      })}
      ;
    </div>
  );
}
