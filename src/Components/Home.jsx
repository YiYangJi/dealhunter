import React, { useEffect, useState } from "react";
import { getFreeGames, getListGames, getTopDeals } from "../Services/file";
import "./Home.css";
import ListCards from "./ListCards";

export default function Home({ setGameName }) {
  const [games, setGames] = useState([]);

  const fetchTopDeals = async () => {
    const promises = [];
    promises.push(getTopDeals());
    const response = await Promise.all(promises);

    const data = [];
    response.forEach((res) => {
      data.push(res);
    });

    setGames(data);

    console.log(games);
  };

  useEffect(() => {
    fetchTopDeals();
  }, []);

  return (
    <>
      <div className="pt-5">
        <ListCards games={games} />
      </div>
    </>
  );
}
