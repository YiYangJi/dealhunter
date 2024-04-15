import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getListGames } from "../Services/file";
import ListCards from "./ListCards";

export default function SearchGame() {
  const location = useLocation();
  const nameGame = location.pathname.split("/")[2];

  const [relatedGames, setRelatedGames] = useState([]);

  console.log(nameGame);

  const data = [];

  useEffect(() => {
    getListGames(nameGame).then((res) => {
      res.forEach((game) => {
        data.push(game);
      });
    });
    setRelatedGames(data);
  }, []);

  return <ListCards games={relatedGames} />;
}
