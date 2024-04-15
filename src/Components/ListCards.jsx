import React from "react";
import GameCard from "./GameCard";

export default function ListCards({ games }) {
  return (
    <div className="row m-5">
      {games[0] &&
        games[0].map((game) => (
          <div className="col-3" key={game.gameID}>
            <GameCard game={game} />
          </div>
        ))}
    </div>
  );
}
