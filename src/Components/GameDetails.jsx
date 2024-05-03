import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { getInfoGame, searchGame, searchGameInfo } from "../Services/file";

export default function CardDetails() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [gameData, setGameData] = useState(null);
  const [moreGameData, setMoreGameData] = useState(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const data = await getInfoGame(id);

        console.log(data.info.title);

        if (data && data.length > 0) {
          setGameData(data);
        }

        console.log(gameData);

        let moreData = await searchGame(data.info.title);
        moreData = await searchGameInfo(moreData.results[0].id);

        console.log(moreData);

        if (moreData) {
          setMoreGameData(moreData);
        }
      } catch (error) {
        console.error("Error fetching meal details:", error);
      }
    };

    fetchGameDetails();
  }, [id]);

  return (
    <div className="mt-5 pt-5">
      <div className="container row mt-5">
        <div className="col-8"></div>
        <div className="col-4">
          {moreGameData && (
            <div className="card border-0 ">
              <img className="card-img-top" src={moreGameData.background_image} alt="Title" />
              <div className="card-body">
                <h4 className="card-title"></h4>
                <p className="card-text">Text</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
