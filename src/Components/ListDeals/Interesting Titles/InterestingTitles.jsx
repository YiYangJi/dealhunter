// Importa las librerías de React
import React, { useEffect, useRef, useState } from "react";

import "./InterestingTitles.css"; // Importa el archivo css InterestingTitles
import { getAllListDeals, getAllListDealsFilter } from "../../../Services/AsyncFunctions"; // Importa las funciones getAllListDeals y getAllListDealsFilter

// Importa las librerías de react-bootstrap
import { Tooltip, OverlayTrigger } from "react-bootstrap";

import ListCards from "../ListCards"; // Importa el componente ListCards
import Loading from "../../Loading/Loading"; // Importa el componente Loading
import "../Filter.css"; // Importa el archivo css para los filtros

// Importa las librerías de react-toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define y exporta la función InterestingTitles
export default function InterestingTitles() {
  const [interestingGames, setInterestingGames] = useState([]); // Define el useState InterestingGames
  const [uniqueInterestingGames, setUniqueInterestingGames] = useState([]); // Define el useState uniqueInterestingGames

  const [page, setPage] = useState(0); // Define el useState page

  // Define los useState para los filtros
  const [priceLimit, setPriceLimit] = useState(50);
  const [filteredInterestingGames, setFilteredInterestingGames] = useState([]);
  const [radioSelectedOption, setRadioSelectedOption] = useState("2500");
  const [checkboxes, setCheckboxes] = useState({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
  });

  const [isLoading, setIsLoading] = useState(false); // Define el useState isLoading

  const toastDisplayedRef = useRef(false); // Define el useRef toastDisplayedRef

  // Define el useEffect para hacer la petición de los juegos interesantes
  useEffect(() => {
    window.scrollTo(0, 0); // Hace scroll hasta arriba de la página

    // Define una función llamada fetchListDeals
    const fetchListDeals = async () => {
      const promises = []; // Define un array de promises
      promises.push(getAllListDeals(page)); // Añade a promises la promise de getAllListDeals con el valor de page
      const response = await Promise.all(promises); // Espera a que se resuelvan todas las promises

      // Si la respuesta está vacía, devuelve error o contiene un error de límite de peticiones
      if (
        response[0] &&
        !response[0].ok &&
        response[0] &&
        response[0].error &&
        response[0].error.includes("You are being temporarily blocked due to rate limiting")
      ) {
        // Si el toast no se ha mostrado aún
        if (!toastDisplayedRef.current) {
          // Muestra un toast con el mensaje de error
          toast.error(<div className="text-center">You have made too many requests. Please try again later.</div>);
          toastDisplayedRef.current = true; // Cambia el valor de toastDisplayedRef a true
        }
      }

      const data = []; // Define un array data
      // Por cada respuesta
      response.forEach((res) => {
        data.push(res); // Añade la respuesta a data
      });

      setInterestingGames(data); // Establece el valor de InterestingGames a data

      // Filtra los juegos únicos con los parametros de juego, índice y el array completo (self)
      // Se busca en el array completo el primer elemento que tenga el mismo id que el juego actual
      // Luego el resultado (indice de self) se compara con el indice actual, si es igual, se añade al array de juegos únicos
      let unique =
        data[0] && !data[0].error
          ? data[0].filter((game, index, self) => index === self.findIndex((element) => element.gameID === game.gameID))
          : [];

      setUniqueInterestingGames(unique); // Establece el valor de uniqueInterestingGames a unique

      handleFilter(); // Ejecuta la función handleFilter
    };

    fetchListDeals(); // Ejecuta la función fetchListDeals
  }, [page]); // Se ejecuta cada vez que cambia el valor de page

  // Define un useEffect
  useEffect(() => {
    // Si InterestingGames tiene datos
    if (interestingGames) {
      // Filtra los juegos únicos con los parametros de juego, índice y el array completo (self)
      // Se busca en el array completo el primer elemento que tenga el mismo id que el juego actual
      // Luego el resultado (indice de self) se compara con el indice actual, si es igual, se añade al array de juegos únicos
      let uniqueFilter =
        interestingGames[0] && !interestingGames[0].error
          ? interestingGames[0].filter((game, index, self) => index === self.findIndex((element) => element.gameID === game.gameID))
          : [];

      setFilteredInterestingGames(uniqueFilter); // Establece el valor de filteredInterestingGames a los juegos filtrados

      console.log(filteredInterestingGames); // Muestra en consola los juegos filtrados
    }
  }, [interestingGames]); // Se ejecuta cada vez que cambia el valor de InterestingGames

  /////////////////////////////////////////////
  // PAGINATION LOGIC
  /////////////////////////////////////////////
  // Define una función handleNextPage para la paginación
  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1); // Aumenta el valor de page en 1
  };

  // Define una función handlePreviousPage para la paginación
  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 0)); // Disminuye el valor de page en 1, sin que sea menor a 0
  };

  /////////////////////////////////////////////
  // FILTERS LOGIC
  /////////////////////////////////////////////
  // Define una función handleFilter para los filtros
  const handleFilter = () => {
    // Define una función asíncrona
    const fetchListDealsFilter = async () => {
      const promises = []; // Crea un array de promises
      // Añade a promises el resultado de getAllListDealsFilter con los valores de priceLimit, radioSelectedOption, los valores de los checkboxes y la página
      promises.push(
        getAllListDealsFilter(
          priceLimit,
          radioSelectedOption,
          Number(checkboxes.checkbox1),
          Number(checkboxes.checkbox2),
          Number(checkboxes.checkbox3),
          page
        )
      );
      const response = await Promise.all(promises); // Espera a que se resuelvan todas las promises

      const data = []; // Define un array data
      // Por cada respuesta
      response.forEach((res) => {
        data.push(res); // Añade la respuesta a data
      });

      setInterestingGames(data); // Establece el valor de InterestingGames a los juegos filtrados
    };

    // Si hay juegos únicos, si hay un radio seleccionado o si alguno de los checkboxes está seleccionado
    if (
      (uniqueInterestingGames && uniqueInterestingGames.length > 0) ||
      radioSelectedOption ||
      Object.values(checkboxes).some((checkbox) => checkbox === true)
    ) {
      fetchListDealsFilter(); // Ejecuta la función fetchListDealsFilter
    }
  };

  // Define una función handleRadioOptionChange para los radio buttons
  const handleRadioOptionChange = (event) => {
    setRadioSelectedOption(event.target.value); // Establece el valor de radioSelectedOption al valor del radio button seleccionado
  };

  // Define una función handleCheckboxChange para los checkboxes
  const handleCheckboxChange = (event) => {
    // Se crea una copia de los checkboxes y actualiza o modifica el valor del checkbox seleccionado
    setCheckboxes({
      ...checkboxes,
      [event.target.name]: event.target.checked,
    });
  };

  // Define una función cleanFilter para limpiar los filtros
  const cleanFilter = () => {
    setFilteredInterestingGames(uniqueInterestingGames); // Establece el valor de filteredInterestingGames a los juegos únicos
    setPriceLimit(50); // Establece el valor de priceLimit a 50
    setRadioSelectedOption("2500"); // Establece el valor de radioSelectedOption a 2500
    // Establece el valor de los checkboxes a false
    setCheckboxes({
      checkbox1: false,
      checkbox2: false,
      checkbox3: false,
    });
  };

  return (
    <>
      <div className="interestingTitles__bg-presentation-overlay pt-4 d-flex align-items-center justify-content-center">
        <div className="text-white text-center">
          <h1 className="pt-5 fw-bold mb-5 interestingTitles__h1--title">Interesting titles</h1>
        </div>
      </div>

      <div className="container mx-auto row justify-content-center my-5">
        <div className="col-lg-3 col-md-9 text-white mb-lg-0 mb-5">
          <div className="p-3 bg-black rounded">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="fw-bold">FILTERS</h3>
              <i className="fas fa-filter me-2"></i>
            </div>
            <div className="my-4">
              <h4>Price</h4>
              <label className="listDeals_slider w-100 text-center">
                <OverlayTrigger placement="right" overlay={<Tooltip id={`tooltip-right`}>50 acts the same as no limit</Tooltip>}>
                  <span>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      className="level"
                      value={priceLimit}
                      onInput={(event) => {
                        event.target.nextElementSibling.value = event.target.value; // Establece el valor del output al valor del input
                        setPriceLimit(event.target.value); // Establece el valor de priceLimit al valor del input
                      }}
                    />
                    Limit Price: <output>{priceLimit}</output>€
                  </span>
                </OverlayTrigger>
              </label>
            </div>

            <div className="my-4">
              <h4>Offer date</h4>

              <div className="radio-buttons-container">
                <div className="radio-button">
                  <input
                    name="radio-group"
                    id="radio2"
                    className="radio-button__input"
                    type="radio"
                    value="2500"
                    checked={radioSelectedOption === "2500"}
                    onChange={handleRadioOptionChange} // Cuando se cambia el radio button, ejecuta la función handleRadioOptionChange
                  />
                  <label htmlFor="radio2" className="radio-button__label">
                    <span className="radio-button__custom"></span>
                    All offers
                  </label>
                </div>
                <div className="radio-button">
                  <input
                    name="radio-group"
                    id="radio1"
                    className="radio-button__input"
                    type="radio"
                    value="24"
                    checked={radioSelectedOption === "24"}
                    onChange={handleRadioOptionChange} // Cuando se cambia el radio button, ejecuta la función handleRadioOptionChange
                  />
                  <label htmlFor="radio1" className="radio-button__label">
                    <span className="radio-button__custom"></span>
                    Last 24h offers
                  </label>
                </div>
                <div className="radio-button">
                  <input
                    name="radio-group"
                    id="radio3"
                    className="radio-button__input"
                    type="radio"
                    value="168"
                    checked={radioSelectedOption === "168"}
                    onChange={handleRadioOptionChange} // Cuando se cambia el radio button, ejecuta la función handleRadioOptionChange
                  />
                  <label htmlFor="radio3" className="radio-button__label">
                    <span className="radio-button__custom"></span>
                    Last week offers
                  </label>
                </div>
                <div className="radio-button">
                  <input
                    name="radio-group"
                    id="radio4"
                    className="radio-button__input"
                    type="radio"
                    value="720"
                    checked={radioSelectedOption === "720"}
                    onChange={handleRadioOptionChange} // Cuando se cambia el radio button, ejecuta la función handleRadioOptionChange
                  />
                  <label htmlFor="radio4" className="radio-button__label">
                    <span className="radio-button__custom"></span>
                    Last month offers
                  </label>
                </div>
              </div>
            </div>

            <div className="my-4">
              <div className="checkbox-wrapper-4">
                <input
                  type="checkbox"
                  id="aaa"
                  className="inp-cbx"
                  name="checkbox1"
                  checked={checkboxes.checkbox1}
                  onChange={handleCheckboxChange} // Cuando se cambia el checkbox, ejecuta la función handleCheckboxChange
                />
                <label htmlFor="aaa" className="cbx ps-0 pb-1">
                  <span>
                    {" "}
                    <svg height="10px" width="12px"></svg>
                  </span>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip id={`tooltip-right`}>Filters games with a current retail price greater than 29€</Tooltip>}>
                    <span> AAA</span>
                  </OverlayTrigger>
                </label>
                <svg className="inline-svg">
                  <symbol viewBox="0 0 12 10" id="check-4">
                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                  </symbol>
                </svg>
              </div>
              <div className="checkbox-wrapper-4">
                <input
                  type="checkbox"
                  id="steamWorks"
                  className="inp-cbx"
                  name="checkbox2"
                  checked={checkboxes.checkbox2}
                  onChange={handleCheckboxChange} // Cuando se cambia el checkbox, ejecuta la función handleCheckboxChange
                />
                <label htmlFor="steamWorks" className="cbx ps-0 pb-1">
                  <span>
                    {" "}
                    <svg height="10px" width="12px"></svg>
                  </span>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip id={`tooltip-right`}>Filter only the games that redeem on Steam</Tooltip>}>
                    <span> SteamWorks</span>
                  </OverlayTrigger>
                </label>
                <svg className="inline-svg">
                  <symbol viewBox="0 0 12 10" id="check-4">
                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                  </symbol>
                </svg>
              </div>

              <div className="checkbox-wrapper-4">
                <input
                  type="checkbox"
                  id="onsale"
                  className="inp-cbx"
                  name="checkbox3"
                  checked={checkboxes.checkbox3}
                  onChange={handleCheckboxChange} // Cuando se cambia el checkbox, ejecuta la función handleCheckboxChange
                />
                <label htmlFor="onsale" className="cbx ps-0 pb-1">
                  <span>
                    {" "}
                    <svg height="10px" width="12px"></svg>
                  </span>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip id={`tooltip-right`}>Include only games that are currently on sale</Tooltip>}>
                    <span> On sale</span>
                  </OverlayTrigger>
                </label>
                <svg className="inline-svg">
                  <symbol viewBox="0 0 12 10" id="check-4">
                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                  </symbol>
                </svg>
              </div>
            </div>
            <div className="text-center mt-3">
              {/* Cuando se hace click en el botón, ejecuta la función cleanFilter */}
              <button className="btn btn-secondary me-xl-3 me-md-2 me-3" onClick={cleanFilter}>
                Clean filters
              </button>
              {/* Cuando se hace click en el botón, ejecuta la función handleFilter */}
              <button className="btn btn-primary" onClick={handleFilter}>
                Filter
              </button>
            </div>
          </div>
        </div>
        <div className="col-xl-9 col-lg-9 col-md-12 col-12">
          {/* Si isLoading es true, ejecuta el componente Loading */}
          {isLoading && <Loading />}
          {/* Si filteredInterestingGames existe, ejecuta el componente ListCards con los juegos filtrados, pasándole setIsLoading como prop */}
          {filteredInterestingGames && <ListCards filteredGames={filteredInterestingGames} setIsLoading={setIsLoading} />}
        </div>
        <div className="d-flex justify-content-center mt-3">
          <button class="interestingTitles__button--pagination me-5" onClick={handlePreviousPage}>
            Previous
          </button>
          <button class="interestingTitles__button--pagination" onClick={handleNextPage}>
            Next
          </button>
        </div>
      </div>
      {/* Renderiza el ToastContainer para las notificaciones */}
      <ToastContainer position="bottom-center" autoClose={2000} closeOnClick pauseOnFocusLoss={false} draggable theme="dark" />
    </>
  );
}
