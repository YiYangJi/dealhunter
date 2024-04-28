import React, { useEffect, useState } from "react";
import { getFreeGames, getListGames, getTopDeals } from "../Services/file";
import "./Home.css";
import ListCards from "./ListCards";
import Carousel from "./Carousel";

export default function Home() {
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
  };

  useEffect(() => {
    fetchTopDeals();
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
          <h3 className="text-white">New deals</h3>
          <a href="#" className="text-decoration-none text-white ms-4">
            See all
            <i className="fa-solid fa-caret-right"></i>
          </a>
        </div>

        <Carousel games={games} />

        <div className="row justify-content-center mt-5">
          <div className="col-lg-5 col-12 mb-5 deal-section">
            <h3 className="text-white text-center">Best deals</h3>
            <div className="card bg-black text-light rounded-0 border-bottom mx-auto" style={{ maxWidth: "500px", maxHeight: "45px" }}>
              <div className="row g-0 align-items-center">
                <div className="col-3">
                  <img
                    src="https://cdn.cloudflare.steamstatic.com/steam/apps/1139280/capsule_sm_120.jpg?t=1706115924"
                    className="img-fluid"
                    alt="Card title"
                  />
                </div>
                <div className="col-9">
                  <div className="row justify-content-between align-items-center">
                    <div className="col-md-9 col-8">
                      <p
                        className="card-text text-truncate m-0"
                        data-bs-toggle="tooltip"
                        title="Neverwinter Nights: Enhanced Edition Digital Deluxe Edition">
                        Neverwinter Nights: Enhanced Edition Digital Deluxe Edition
                      </p>
                    </div>
                    <div className="col-md-3 col-4">
                      <p className="m-0">
                        <span className="fw-bold fs-5">0.22€</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-12 deal-section">
            <h3 className="text-white text-center">Top rated</h3>
            <div className="card bg-black text-light rounded-0 border-bottom mx-auto" style={{ maxWidth: "500px", maxHeight: "45px" }}>
              <div className="row g-0 align-items-center">
                <div className="col-3">
                  <img
                    src="https://cdn.cloudflare.steamstatic.com/steam/apps/1139280/capsule_sm_120.jpg?t=1706115924"
                    className="img-fluid"
                    alt="Card title"
                  />
                </div>
                <div className="col-9">
                  <div className="row justify-content-between align-items-center">
                    <div className="col-md-9 col-8">
                      <p
                        className="card-text text-truncate m-0"
                        data-bs-toggle="tooltip"
                        title="Neverwinter Nights: Enhanced Edition Digital Deluxe Edition">
                        Neverwinter Nights: Enhanced Edition Digital Deluxe Edition
                      </p>
                    </div>
                    <div className="col-md-3 col-4">
                      <p className="m-0">
                        <span className="fw-bold fs-5">0.22€</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
