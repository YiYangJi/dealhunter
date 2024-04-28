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
    <div className="carousel-inner p-3">
      {uniqueGames.map((game) => {
        return (
          <div className="carousel-item me-0" key={game.gameID}>
            {game.title !== undefined ? <GameCard game={game} /> : <SearchGameCard game={game} />}
          </div>
        );
      })}
    </div>
  );
}
