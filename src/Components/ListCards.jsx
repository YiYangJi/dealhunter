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
    <div className="row m-5 pt-5 justify-content-center">
      {uniqueGames.map((game) => {
        return (
          <div className="col-xl-3 col-lg-4 col-md-6 col-12 mb-4" key={game.gameID}>
            {game.title !== undefined ? <GameCard game={game} /> : <SearchGameCard game={game} />}
          </div>
        );
      })}
    </div>
  );
}
