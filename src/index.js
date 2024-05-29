// Importa la libreria de React
import React from "react";
import ReactDOM from "react-dom/client"; // Importa ReactDOM para renderizar la aplicación en el DOM
import App from "./App"; // Importa el componente App
import { BrowserRouter } from "react-router-dom"; // Importa BrowserRouter de react-router-dom

// Crea una raíz para la aplicación en el elemento con id "root"
const root = ReactDOM.createRoot(document.getElementById("root"));
// Renderiza la aplicación
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* Renderiza el componente App, el componente principal de la aplicación */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
