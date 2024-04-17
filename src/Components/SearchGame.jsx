import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getListGames } from "../Services/file";
import ListCards from "./ListCards";

export default function SearchGame() {
  const location = useLocation();
  const nameGame = location.pathname.split("/")[2];

  const [relatedGames, setRelatedGames] = useState([]);

  console.log(nameGame);

  const fetchGames = async () => {
    const promises = [];
    promises.push(getListGames(nameGame));
    const response = await Promise.all(promises);

    const data = [];
    response.forEach((res) => {
      data.push(res);
    });

    setRelatedGames(data);
  };

  useEffect(() => {
    fetchGames();
  }, [nameGame]);

  return <ListCards games={relatedGames} />;
}
