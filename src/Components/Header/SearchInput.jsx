// Importa las librerias de React
import React, { useState } from "react";

// Importa las librerias de bootstrap
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import { useNavigate } from "react-router-dom"; // Importa la libreria de react-router-dom
import "./SearchInput.css"; // Importa el archivo css de SearchInput.css

// Importa las librerias de react-toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define y exporta el componente SearchInput pasandole como parametro onClose
export default function SearchInput({ onClose }) {
  const [nameGame, setNameGame] = useState(""); // UseState para el nombre del juego

  const navigate = useNavigate(); // Define un useNavigate para poder navegar entre las rutas

  const handleGameName = (e) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
    console.log(nameGame);
    // En caso de que el campo esté vacio:
    if (!nameGame) {
      // El error será que no ha rellenado el campo
      toast.warning(<div className="text-center">Introduce a game</div>);
      // Sino
    } else {
      navigate(`/searchGame/${nameGame}`); // Navega a la ruta /searchGame con el nombre del juego
      setNameGame(""); // Limpia el campo de busqueda
      onClose(); // Cierra el offcanvas del menu
    }
  };

  return (
    <>
      <Form className="d-flex" onSubmit={handleGameName}>
        <Form.Control
          type="search"
          placeholder="Search for game deals.."
          className="me-2"
          aria-label="Search"
          onChange={(e) => setNameGame(e.target.value)} // Al cambiar el valor del campo, se actualiza el nombre del juego
          value={nameGame} // El valor del campo es nameGame (para limpiar el campo de busqueda al enviar el formulario)
        />

        <Button className="searchInput__button--elegant" type="submit">
          Search
        </Button>
      </Form>

      {/* Contenedor para las notificaciones */}
      <ToastContainer position="bottom-center" autoClose={2000} closeOnClick pauseOnFocusLoss={false} draggable theme="dark" />
    </>
  );
}
