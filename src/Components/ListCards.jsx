import React from "react";
import GameCard from "./GameCard";

export default function ListCards({ games }) {
  let uniqueGames =
    games && games[0] ? games[0].filter((game, index, self) => index === self.findIndex((t) => t.gameID === game.gameID)) : [];

  return (
    <div className="row m-5">
      {uniqueGames.map((game) => (
        <div className="col-3" key={game.gameID}>
          <GameCard game={game} />
        </div>
      ))}
    </div>
  );
}
