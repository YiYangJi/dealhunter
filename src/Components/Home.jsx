import React, { useEffect, useState } from "react";
import { getBestDeals, getListDeals, getTopRated } from "../Services/file";
import "./Home.css";
import ListCards from "./ListCards";
import Carousel from "./Carousel";
import BestDeals from "./BestDeals";
import TopRated from "./NewDeals";

export default function Home() {
  const [games, setGames] = useState([]);
  const [bestDeals, setBestDeals] = useState([]);
  const [newDeals, setnewDeals] = useState([]);

  const fetchListDeals = async () => {
    const promises = [];
    promises.push(getListDeals());
    const response = await Promise.all(promises);

    const data = [];
    response.forEach((res) => {
      data.push(res);
    });

    setGames(data);
  };

  const fetchBestDeals = async () => {
    const promises = [];
    promises.push(getBestDeals());
    const response = await Promise.all(promises);

    const data = [];
    response.forEach((res) => {
      data.push(res);
    });

    setBestDeals(data);
  };

  const fetchTopRated = async () => {
    const promises = [];
    promises.push(getTopRated());
    const response = await Promise.all(promises);

    const data = [];
    response.forEach((res) => {
      data.push(res);
    });

    setnewDeals(data);
  };

  useEffect(() => {
    fetchListDeals();
    fetchBestDeals();
    fetchTopRated();

    console.log(bestDeals);
  }, []);

  return (
    <>
      <div className="bg-presentation-overlay pt-4">
        <div className="row text-center text-white">
          <h1 className="pt-5 fw-bold mb-5">Find your favorites at the best price!</h1>
          <h4 className="px-5 pb-5 fw-normal">
            Welcome to our video game deals platform, where you'll find a wide range of titles, from timeless classics to the latest
            releases. Our goal is to give you with access to the games you love at the best possible price.
            <br />
            <br />
            Explore our diverse catalogue and discover irresistible deals on action, adventure, strategy, sports, and much more. Don't miss
            out on savings on your favorite titles and join our community of passionate gamers today.
            <br />
            <br />
            Explore, save, and play more with us!
          </h4>
          <br />
          <br />
        </div>
      </div>

      <div className="container my-5">
        <div className="d-flex align-items-center">
          <h3 className="text-white">Interesting titles</h3>
          <a href="#" className="text-decoration-none text-white ms-4">
            See all
            <i className="fa-solid fa-caret-right"></i>
          </a>
        </div>

        <Carousel games={games} />

        <div className="row justify-content-center mt-5">
          <div className="col-lg-5 col-12 mb-5 deal-section">
            <h3 className="text-white text-center">Best deals</h3>
            {/* <BestDeals bestDeals={bestDeals} /> */}
          </div>
          <div className="col-lg-5 col-12 deal-section">
            <h3 className="text-white text-center">New deals</h3>
            {/* <TopRated newDeals={newDeals} /> */}
          </div>
        </div>
      </div>

      <div class="bg-stores-overlay pt-4">
        <div class="row text-center text-white">
          <h1 class="pt-5 fw-bold mb-5">Discover Exclusive Deals from Trusted Gaming Platforms!</h1>
          <h4 class="px-5 pb-5 fw-normal">
            On our platform, we offer a wide selection of games from some of the most trusted and recognized platforms in the digital
            entertainment industry. Explore exciting deals from trusted platforms like Steam, Ubisoft, Epic Games, and more. With the
            quality and authenticity guarantee of these leading platforms, you can shop with confidence and enjoy an exceptional gaming
            experience.
            <br />
            <br />
            Explore our catalog today and find your next favorite game!
          </h4>
          <br />
          <br />
        </div>
      </div>

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-6 mb-4">
            <a href="#" className="text-decoration-none">
              <div className="card bg-dark border-0 text-center text-white">
                <i className="fa-brands fa-discord fa-4x fa-bounce-hover pt-3"></i>
                <div className="card-body">
                  <h4 className="card-title pb-4">Try our Discord Bot!</h4>
                  <p className="card-text">Invite our bot for games, join the action and enhance your community's experience today!</p>
                </div>
              </div>
            </a>
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <a href="#" className="text-decoration-none">
              <div className="card bg-dark border-0 text-center text-white">
                <i className="fa-solid fa-address-card fa-4x fa-bounce-hover pt-3"></i>
                <div className="card-body">
                  <h4 className="card-title pb-4">Want to know more?</h4>
                  <p className="card-text">Click here and explore my story, experience, and passions in the world of technology.</p>
                </div>
              </div>
            </a>
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <a href="#" className="text-decoration-none">
              <div className="card bg-dark border-0 text-center text-white">
                <i className="fa-solid fa-file-circle-question fa-4x fa-bounce-hover pt-3"></i>
                <div className="card-body">
                  <h4 className="card-title pb-4">Questions or suggestions?</h4>
                  <p className="card-text">Feel free to contact or share your feedback and ideas with me!</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
