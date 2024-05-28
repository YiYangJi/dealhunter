// Importa funciones de React para manejar efectos, referencias y estado
import React, { useEffect, useRef, useState } from "react";
// Importa funciones asíncronas para obtener datos sobre las ofertas
import { getBestDeals, getListDeals, getNewDeals } from "../../Services/AsyncFunctions";
// Importa los estilos CSS para este componente
import "./Home.css";

// Importa componentes para mostrar los titulos interesantes, mejores ofertas y las nuevas ofertas
import CardBestDeals from "./CardBestDeals";
import CardNewDeals from "./CardNewDeals";
import CarouselDeals from "./CarouselDeals";

import "react-multi-carousel/lib/styles.css"; // Importa el componente de carrusel de ofertas
import { Link } from "react-router-dom"; // Importa el componente Link de React Router
import Loading from "../Loading/Loading"; // Importa el componente de carga

// Importa las librerías de React Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define y exporta la función Home
export default function Home() {
  const [games, setGames] = useState([]); // Define el estado de los juegos
  const [uniqueGames, setUniqueGames] = useState([]); // Define el estado de los juegos únicos (filtro de juegos)
  const [bestDeals, setBestDeals] = useState([]); // Define el estado de las mejores ofertas
  const [newDeals, setnewDeals] = useState([]); // Define el estado de las nuevas ofertas

  const [isLoading, setIsLoading] = useState(true); // Define el estado de carga

  // UseEffect para cargar los datos al cargar la página
  useEffect(() => {
    window.scrollTo(0, 0); // Posiciona la página en la parte superior

    // Función asíncrona para obtener la lista de ofertas
    const fetchListDeals = async () => {
      const promises = []; // Define un array de promesas
      promises.push(getListDeals()); // Añade la promesa de obtener la lista de ofertas
      const response = await Promise.all(promises); // Espera a que se resuelvan todas las promesas

      // Si la respuesta está vacia, devuelve error o contiene un error de límite de peticiones
      if (
        response[0] &&
        !response[0].ok &&
        response[0].error &&
        response[0].error.includes("You are being temporarily blocked due to rate limiting")
      ) {
        // Muestra un mensaje de error
        toast.error(<div className="text-center">You have made too many requests. Please try again later.</div>);
      }

      const data = []; // Define un array de datos
      // Para cada respuesta
      response.forEach((res) => {
        data.push(res); // Añade la respuesta al array de datos
      });

      setGames(data); // Establece los juegos con los datos obtenidos
      setIsLoading(false); // Establece el estado de carga a falso
    };

    // Función asíncrona para obtener las mejores ofertas
    const fetchBestDeals = async () => {
      const promises = []; // Define un array de promesas
      promises.push(getBestDeals()); // Añade la promesa de obtener las mejores ofertas
      const response = await Promise.all(promises); // Espera a que se resuelvan todas las promesas

      const data = []; // Define un array de datos
      // Para cada respuesta
      response.forEach((res) => {
        data.push(res); // Añade la respuesta al array de datos
      });

      setBestDeals(data); // Establece las mejores ofertas con los datos obtenidos
      setIsLoading(false); // Establece el estado de carga a falso
    };

    // Función asíncrona para obtener las nuevas ofertas
    const fetchNewDeals = async () => {
      const promises = []; // Define un array de promesas
      promises.push(getNewDeals()); // Añade la promesa de obtener las nuevas ofertas
      const response = await Promise.all(promises); // Espera a que se resuelvan todas las promesas

      const data = []; // Define un array de datos
      // Para cada respuesta
      response.forEach((res) => {
        data.push(res); // Añade la respuesta al array de datos
      });

      setnewDeals(data); // Establece las nuevas ofertas con los datos obtenidos
      setIsLoading(false); // Establece el estado de carga a falso
    };

    // Llama a las funciones para obtener la lista de ofertas, las mejores ofertas y las nuevas ofertas
    fetchListDeals();
    fetchBestDeals();
    fetchNewDeals();
  }, []);

  // UseEffect para filtrar los juegos únicos cada vez que cambia el estado de los juegos
  useEffect(() => {
    // Si hay juegos
    if (games) {
      // Filtra los juegos únicos con los parametros de juego, índice y el array completo (self)
      // Se busca en el array completo el primer elemento que tenga el mismo id que el juego actual
      // Luego el resultado (indice de self) se compara con el indice actual, si es igual, se añade al array de juegos únicos
      let unique =
        games[0] && !games[0].error
          ? games[0].filter((game, index, self) => index === self.findIndex((element) => element.gameID === game.gameID))
          : [];

      setUniqueGames(unique); // Establece los juegos únicos con los juegos filtrados
    }
  }, [games]);

  // Muestra el indicador de carga si el estado de carga está activado
  if (isLoading) {
    return <Loading />;
    // Si no hay carga, muestra la página
  } else {
    return (
      <>
        <div className="home__bg-presentation--overlay pt-4">
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
          {/* Renderiza el carrusel de ofertas con los juegos únicos */}
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
              {/* Renderiza el componente de mejores ofertas con los datos obtenidos */}
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
              {/* Renderiza el componente de nuevas ofertas con los datos obtenidos */}
              <CardNewDeals newDeals={newDeals} />
            </div>
          </div>
        </div>

        <div className="home__bg-stores--overlay pt-4">
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
              <a
                href="https://discord.com/oauth2/authorize?client_id=1220283733400092692"
                target="_blank"
                className="text-decoration-none"
                rel="noreferrer">
                <div className="home__card bg-dark border-0 text-center text-white">
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
                <div className="home__card bg-dark border-0 text-center text-white">
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

        <div className="home__bg-homeContact--overlay pt-4 d-flex flex-column justify-content-evenly align-items-center text-center text-white">
          <div className="col-lg-9 col-md-8 col-sm-10 col-10">
            <h2 className="fw-bold">
              Questions or suggestions? <br /> Feel free to contact or share your feedback and ideas with us!
            </h2>
          </div>
          <div className="col-8">
            <Link to={"/contact"} onClick={() => window.scrollTo(0, 0)} className="text-decoration-none d-inline-block">
              <button className="home__button--contact bg-primary">
                <p className="home__button-text--contact">Contact now!</p>{" "}
                <p className="home__iconer">
                  <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor"></path>
                  </svg>
                </p>
              </button>
            </Link>
          </div>
        </div>
        {/* Renderiza el toast */}
        <ToastContainer position="bottom-center" autoClose={2000} closeOnClick pauseOnFocusLoss={false} draggable theme="dark" />
      </>
    );
  }
}
