// Importa la libreria de React
import React from "react";

import "./Loading.css"; // Importa el archivo de estilos Loading.css

// Define y exporta el componente Loading
export default function Loading() {
  return (
    <div className="d-flex justify-content-center align-items-center h-100 vh-100">
      <div className="loading__loader-wrapper">
        <div className="loading__packman"></div>
        <div className="loading__dots">
          <div className="loading__dot"></div>
          <div className="loading__dot"></div>
          <div className="loading__dot"></div>
          <div className="loading__dot"></div>
        </div>
      </div>
    </div>
  );
}
