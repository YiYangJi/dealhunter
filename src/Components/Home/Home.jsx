import React, { useEffect, useRef, useState } from "react";
import { getBestDeals, getListDeals, getNewDeals } from "../../Services/AsyncFunctions";
import "./Home.css";

import CardBestDeals from "./CardBestDeals";
import CardNewDeals from "./CardNewDeals";

import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import CarouselDeals from "./CarouselDeals";
import Loading from "../Loading/Loading";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [games, setGames] = useState([]);
  const [uniqueGames, setUniqueGames] = useState([]);
  const [bestDeals, setBestDeals] = useState([]);
  const [newDeals, setnewDeals] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const toastDisplayedRef = useRef(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchListDeals = async () => {
      const promises = [];
      promises.push(getListDeals());
      const response = await Promise.all(promises);

      if (
        response[0] &&
        !response[0].ok &&
        response[0] &&
        response[0].error &&
        response[0].error.includes("You are being temporarily blocked due to rate limiting")
      ) {
        toast.error(<div className="text-center">You have made too many requests. Please try again later.</div>);
      }

      const data = [];
      response.forEach((res) => {
        data.push(res);
      });

      setGames(data);
      setIsLoading(false);
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
      setIsLoading(false);
    };

    const fetchNewDeals = async () => {
      const promises = [];
      promises.push(getNewDeals());
      const response = await Promise.all(promises);

      const data = [];
      response.forEach((res) => {
        data.push(res);
      });

      setnewDeals(data);
    };

    fetchListDeals();
    fetchBestDeals();
    fetchNewDeals();
  }, []);

  useEffect(() => {
    if (games) {
      let unique =
        games[0] && !games[0].error
          ? games[0].filter((game, index, self) => index === self.findIndex((t) => t.gameID === game.gameID))
          : [];

      setUniqueGames(unique);
    }
  }, [games]);

  if (isLoading) {
    return <Loading />;
  } else {
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
              Explore our diverse catalogue and discover irresistible deals on action, adventure, strategy, sports, and much more. Don't
              miss out on savings on your favorite titles and join our community of passionate gamers today.
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
            <Link to="/interesting titles" className="text-decoration-none text-white ms-4" onClick={() => window.scrollTo(0, 0)}>
              See more
              <i className="fa-solid fa-caret-right ms-2"></i>
            </Link>
          </div>
          <CarouselDeals uniqueGames={uniqueGames} />

          <div className="row justify-content-center mt-5">
            <div className="col-lg-5 col-md-12 mb-5 deal-section">
              <div className="d-flex align-items-center">
                <h3 className="text-white text-center">Best deals</h3>
                <Link to="/best deals" className="text-decoration-none text-white ms-4" onClick={() => window.scrollTo(0, 0)}>
                  See more
                  <i className="fa-solid fa-caret-right ms-2"></i>
                </Link>
              </div>
              <CardBestDeals bestDeals={bestDeals} />
            </div>
            <div className="col-lg-5 col-12 deal-section">
              <div className="d-flex align-items-center">
                <h3 className="text-white text-center">New deals</h3>
                <Link to="/new deals" className="text-decoration-none text-white ms-4" onClick={() => window.scrollTo(0, 0)}>
                  See more
                  <i className="fa-solid fa-caret-right ms-2"></i>
                </Link>
              </div>
              <CardNewDeals newDeals={newDeals} />
            </div>
          </div>
        </div>

        <div className="bg-stores-overlay pt-4">
          <div className="row text-center text-white">
            <h1 className="pt-5 fw-bold mb-5">Discover Exclusive Deals from Trusted Gaming Platforms!</h1>
            <h4 className="px-5 pb-5 fw-normal">
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
            <div className="col-lg-5 col-sm-6 mb-4">
              <a href="#" className="text-decoration-none">
                <div className="card bg-dark border-0 text-center text-white">
                  <i className="fa-brands fa-discord fa-5x fa-bounce-hover pt-3"></i>
                  <div className="card-body">
                    <h4 className="card-title pb-4">Try our Discord Bot!</h4>
                    <p className="card-text">Invite our bot for games, join the action and enhance your community's experience today!</p>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-lg-5 col-sm-6 mb-4">
              <Link to={"/about"} className="text-decoration-none" onClick={() => window.scrollTo(0, 0)}>
                <div className="card bg-dark border-0 text-center text-white">
                  <i className="fa-solid fa-address-card fa-5x fa-bounce-hover pt-3"></i>
                  <div className="card-body">
                    <h4 className="card-title pb-4">Want to know more?</h4>
                    <p className="card-text">Click here and explore our story, experience, and passions in the world of technology.</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-homeContact-overlay pt-4 d-flex flex-column justify-content-evenly align-items-center text-center text-white">
          <div className="col-lg-9 col-md-8 col-sm-10 col-10">
            <h2 className="fw-bold">
              Questions or suggestions? <br /> Feel free to contact or share your feedback and ideas with us!
            </h2>
          </div>
          <div className="col-8">
            <Link to={"/contact"} onClick={() => window.scrollTo(0, 0)} className="text-decoration-none d-inline-block">
              <button className="home__button--contact bg-primary">
                <p className="home__button-text--contact">Contact now!</p>{" "}
                <p className="iconer">
                  <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor"></path>
                  </svg>
                </p>
              </button>
            </Link>
          </div>
        </div>
        <ToastContainer position="bottom-center" autoClose={2000} closeOnClick pauseOnFocusLoss={false} draggable theme="dark" />
      </>
    );
  }
}
