import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "./SearchInput.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SearchInput({ onClose }) {
  const [nameGame, setNameGame] = useState("");

  const navigate = useNavigate();

  const handleGameName = (e) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
    console.log(nameGame);
    // En caso de que el campo esté vacio:
    if (!nameGame) {
      // El error será que no ha rellenado el campo
      toast.warning(<div className="text-center">Introduce a game</div>);
    } else {
      navigate(`/searchGame/${nameGame}`);
      setNameGame("");
      onClose();
    }
  };

  useEffect(() => {
    console.log("Componente montado");

    return () => {
      console.log("Componente desmontado");
    };
  }, []);

  return (
    <>
      <Form className="d-flex" onSubmit={handleGameName}>
        <Form.Control
          type="search"
          placeholder="Search for game deals.."
          className="me-2"
          aria-label="Search"
          onChange={(e) => setNameGame(e.target.value)}
          value={nameGame}
        />

        <Button className="searchInput__button--elegant" type="submit">
          Search
        </Button>
      </Form>

      <ToastContainer position="bottom-center" autoClose={2000} closeOnClick pauseOnFocusLoss={false} draggable theme="dark" />
    </>
  );
}
