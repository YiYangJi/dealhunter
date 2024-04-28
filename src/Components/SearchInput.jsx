import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SearchInput() {
  const [nameGame, setNameGame] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  const navigate = useNavigate();

  const handleGameName = (e) => {
    e.preventDefault();

    // En caso de que el campo esté vacio:
    if (!nameGame) {
      // El error será que no ha rellenado el campo
      setMensajeError("Introduce an ingredient");
    } else {
      // Sino, vaciamos el mensaje de error
      setMensajeError("");

      navigate(`/searchGame/${nameGame}`);
      e.target.form.submit();
    }
  };

  return (
    <>
      <form className="d-flex mt-3" role="search">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onKeyUp={(e) => setNameGame(e.target.value)}
        />
        <Link to="/searchByName">
          <button className="btn btn-success" type="submit" onClick={handleGameName}>
            Search
          </button>
        </Link>
      </form>
      <p className="error-feedback text-danger p-0 mb-0 text-center">{mensajeError}</p>
    </>
  );
}
