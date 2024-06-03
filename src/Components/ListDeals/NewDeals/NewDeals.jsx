// Importa las librerías de React
import React, { useEffect, useRef, useState } from "react";

import "./NewDeals.css"; // Importa el archivo css NewDeals.css
import { getAllNewDeals, getAllNewDealsFilter } from "../../../Services/AsyncFunctions"; // Importa las funciones getAllNewDeals y getAllNewDealsFilter
import { Tooltip, OverlayTrigger } from "react-bootstrap"; // Importa las librerías de react-bootstrap
import ListCards from "../ListCards"; // Importa el componente ListCards
import Loading from "../../Loading/Loading"; // Importa el componente Loading
import "../Filter.css"; // Importa el archivo css para los filtros

// Importa las librerías de react-toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define y exporta el componente InterestingTitles
export default function InterestingTitles() {
  const [newDeals, setNewDeals] = useState([]); // Define useState de newDeals
  const [uniqueNewDeals, setUniqueNewDeals] = useState([]); // Define useState de uniqueNewDeals

  const [page, setPage] = useState(0); // Define useState de page

  // Define los useState para los filtros
  const [priceLimit, setPriceLimit] = useState(50);
  const [filteredNewDeals, setFilteredNewDeals] = useState([]);
  const [radioSelectedOption, setRadioSelectedOption] = useState("2500");
  const [checkboxes, setCheckboxes] = useState({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
  });

  const [isLoading, setIsLoading] = useState(false); // Define el useState isLoading
  const toastDisplayedRef = useRef(false); // Define el useRef toastDisplayedRef

  // Define el useEffect
  useEffect(() => {
    window.scrollTo(0, 0); // Cuando se renderiza el componente, se hace scroll hacia arriba

    // Define una función asincrona llamada fetchListDeals
    const fetchListDeals = async () => {
      const promises = []; // Define un array de promises
      promises.push(getAllNewDeals(page)); // Añade a promises la promise de getAllNewDeals con el valor de page
      const response = await Promise.all(promises); // Espera a que se resuelvan todas las promises

      // Si la respuesta está vacía, devuelve error o contiene un error de límite de peticiones
      if (
        response[0] &&
        !response[0].ok &&
        response[0] &&
        response[0].error &&
        response[0].error.includes("You are being temporarily blocked due to rate limiting")
      ) {
        // Si no se ha mostrado el toast
        if (!toastDisplayedRef.current) {
          // Muestra un toast con el mensaje de error
          toast.error(<div className="text-center">You have made too many requests. Please try again later.</div>);
          toastDisplayedRef.current = true; // Cambia el valor de toastDisplayedRef a true
        }
      }

      const data = []; // Define un array data
      // Para cada respuesta
      response.forEach((res) => {
        data.push(res); // Añade la respuesta a data
      });

      setNewDeals(data); // Establece el valor de InterestingGames a data

      // Filtra los juegos únicos con los parametros de juego, índice y el array completo (self)
      // Se busca en el array completo el primer elemento que tenga el mismo id que el juego actual
      // Luego el resultado (indice de self) se compara con el indice actual, si es igual, se añade al array de juegos únicos
      let unique =
        data[0] && !data[0].error
          ? data[0].filter((game, index, self) => index === self.findIndex((element) => element.gameID === game.gameID))
          : [];

      setUniqueNewDeals(unique); // Establece el valor de uniqueInterestingGames a los juegos únicos

      handleFilter(); // Ejecuta la función handleFilter
    };

    fetchListDeals(); // Ejecuta la función fetchListDeals
  }, [page]); // Se ejecuta cuando page cambia

  // Define el useEffect
  useEffect(() => {
    // Si newDeals contiene datos
    if (newDeals) {
      // Filtra los juegos únicos con los parametros de juego, índice y el array completo (self)
      // Se busca en el array completo el primer elemento que tenga el mismo id que el juego actual
      // Luego el resultado (indice de self) se compara con el indice actual, si es igual, se añade al array de juegos únicos
      let uniqueFilter =
        newDeals[0] && !newDeals[0].error
          ? newDeals[0].filter((game, index, self) => index === self.findIndex((element) => element.gameID === game.gameID))
          : [];

      setFilteredNewDeals(uniqueFilter); // Establece el valor de filteredNewDeals a los juegos únicos filtrados
    }
  }, [newDeals]); // Se ejecuta cuando newDeals cambia

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
      const promises = []; // Define un array de promises
      // Añade a promises el resultado de getAllNewDealsFilter con los valores de priceLimit, radioSelectedOption, los valores de los checkboxes y la página
      promises.push(
        getAllNewDealsFilter(
          priceLimit,
          radioSelectedOption,
          Number(checkboxes.checkbox1),
          Number(checkboxes.checkbox2),
          Number(checkboxes.checkbox3),
          page
        )
      );
      const response = await Promise.all(promises); // Espera a que se resuelvan todas las promises

      const data = []; // Define un array data4
      // Para cada respuesta
      response.forEach((res) => {
        data.push(res); // Añade la respuesta a data
      });

      setNewDeals(data); // Establece el valor de InterestingGames a los juegos filtrados
    };

    // Si hay juegos únicos, si hay un radio seleccionado o si alguno de los checkboxes está seleccionado
    if (
      (uniqueNewDeals && uniqueNewDeals.length > 0) ||
      radioSelectedOption ||
      Object.values(checkboxes).some((checkbox) => checkbox === true)
    ) {
      fetchListDealsFilter(); // Ejecuta la función fetchListDealsFilter
    }
  };

  // Define una función handleRadioOptionChange para los radio buttons
  const handleRadioOptionChange = (event) => {
    setRadioSelectedOption(event.target.value); // Establece el valor de radioSelectedOption al valor del radio seleccionado
  };

  // Define una función handleCheckboxChange para los checkboxes
  const handleCheckboxChange = (event) => {
    // Actualiza el valor del checkbox seleccionado
    setCheckboxes({
      ...checkboxes,
      [event.target.name]: event.target.checked,
    });
  };

  // Define una función cleanFilter para limpiar los filtros
  const cleanFilter = () => {
    setFilteredNewDeals(uniqueNewDeals); // Establece el valor de filteredNewDeals a los juegos únicos
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
      <div className="newDeals__bg-presentation-overlay pt-4 d-flex align-items-center justify-content-center">
        <div className="text-white text-center">
          <h1 className="pt-5 fw-bold mb-5 newDeals__h1--title">New deals</h1>
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
                        event.target.nextElementSibling.value = event.target.value; // Iguala el valor del output al valor del input
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
                    onChange={handleRadioOptionChange} // Cuando cambia el radio button, ejecuta la función handleRadioOptionChange
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
                    onChange={handleRadioOptionChange} // Cuando cambia el radio button, ejecuta la función handleRadioOptionChange
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
                    onChange={handleRadioOptionChange} // Cuando cambia el radio button, ejecuta la función handleRadioOptionChange
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
                    onChange={handleRadioOptionChange} // Cuando cambia el radio button, ejecuta la función handleRadioOptionChange
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
                  onChange={handleCheckboxChange} // Cuando cambia el checkbox, ejecuta la función handleCheckboxChange
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
                  onChange={handleCheckboxChange} // Cuando cambia el checkbox, ejecuta la función handleCheckboxChange
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
                  onChange={handleCheckboxChange} // Cuando cambia el checkbox, ejecuta la función handleCheckboxChange
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
          {filteredNewDeals && filteredNewDeals.length > 0 ? (
            <ListCards filteredGames={filteredNewDeals} setIsLoading={setIsLoading} />
          ) : (
            <div className="text-center mt-5">
              <h2 className="text-white">Sorry, no games found matching your filters. Please try adjusting your search criteria.</h2>
            </div>
          )}
        </div>
        <div className="d-flex justify-content-center mt-3">
          <button className="newDeals__button--pagination me-5" onClick={handlePreviousPage}>
            Previous
          </button>
          <button className="newDeals__button--pagination" onClick={handleNextPage}>
            Next
          </button>
        </div>
      </div>
      {/* Renderiza el ToastContainer para las notificaciones */}
      <ToastContainer position="bottom-center" autoClose={2000} closeOnClick pauseOnFocusLoss={false} draggable theme="dark" />
    </>
  );
}
