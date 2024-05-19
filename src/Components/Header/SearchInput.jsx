import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SearchInput({ onClose }) {
  const [nameGame, setNameGame] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  const navigate = useNavigate();

  const handleGameName = (e) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    // En caso de que el campo esté vacio:
    if (!nameGame) {
      // El error será que no ha rellenado el campo
      toast.error(<div className="text-center">Introduce a game</div>);
    } else {
      // Sino, vaciamos el mensaje de error
      setMensajeError("");
      navigate(`/searchGame/${nameGame}`);
      setNameGame("");
      onClose();
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
          onChange={(e) => setNameGame(e.target.value)}
          value={nameGame}
        />
        <Button variant="outline-success" type="submit">
          Search
        </Button>
      </Form>

      <ToastContainer position="bottom-center" pauseOnFocusLoss={false} />
    </>
  );
}
