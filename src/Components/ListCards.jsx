import React from "react";
import GameCard from "./GameCard";

export default function ListCards({ filteredGames, setIsLoading }) {
  return (
    filteredGames &&
    filteredGames.map((game) => {
      return <GameCard game={game} setIsLoading={setIsLoading} key={game.gameID} />;
    })
  );
}
