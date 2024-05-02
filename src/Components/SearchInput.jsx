import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export default function SearchInput() {
  const [nameGame, setNameGame] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  const navigate = useNavigate();

  const handleGameName = (e) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    // En caso de que el campo esté vacio:
    if (!nameGame) {
      // El error será que no ha rellenado el campo
      setMensajeError("Introduce an ingredient");
    } else {
      // Sino, vaciamos el mensaje de error
      setMensajeError("");

      navigate(`/searchGame/${nameGame}`);
      // No necesitas llamar a e.target.form.submit()
    }
  };

  return (
    <>
      <Form className="d-flex" onSubmit={handleGameName}>
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          onKeyUp={(e) => setNameGame(e.target.value)}
        />
        <Button variant="outline-success" type="submit">
          Search
        </Button>
      </Form>

      <p className="error-feedback text-danger p-0 mb-0 text-center">{mensajeError}</p>
    </>
  );
}
