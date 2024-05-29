// Importa la libreria de React
import React from "react";

import { Route, Routes } from "react-router-dom"; // Importa la libreria Route y Routes de react-router-dom
import Home from "./Components/Home/Home"; // Importa el componente Home
import Header from "./Components/Header/Header"; // Importa el componente Header
import SearchGame from "./Components/SearchGame/SearchGame"; // Importa el componente SearchGame
import Footer from "./Components/Footer/Footer"; // Importa el componente Footer
import GameDetails from "./Components/GameDetails/GameDetails"; // Importa el componente GameDetails
import About from "./Components/About/About"; // Importa el componente About
import Contact from "./Components/Contact/Contact"; // Importa el componente Contact
import InterestingTitles from "./Components/ListDeals/Interesting Titles/InterestingTitles"; // Importa el componente InterestingTitles
import BestDeals from "./Components/ListDeals/BestDeals/BestDeals"; // Importa el componente BestDeals
import NewDeals from "./Components/ListDeals/NewDeals/NewDeals"; // Importa el componente NewDeals

// Define la función App
function App() {
  return (
    <div className="App">
      {/* Incluimos el componente Header */}
      <Header />
      <Routes>
        {/* La ruta raiz será el componente Home */}
        <Route path="/" element={<Home />} />
        {/* Ruta que renderiza el componente InterestingTitles */}
        <Route path="/interesting titles" element={<InterestingTitles />} />
        {/* Ruta que renderiza el componente BestDeals */}
        <Route path="/best deals" element={<BestDeals />} />
        {/* Ruta que renderiza el componente NewDeals */}
        <Route path="/new deals" element={<NewDeals />} />
        {/* Ruta que renderiza el componente About */}
        <Route path="/about" element={<About />} />
        {/* Ruta que renderiza el componente Contact */}
        <Route path="/contact" element={<Contact />} />
        {/* Ruta dinámica que renderiza el componente GameDetails con un ID de juego */}
        <Route path="/game/:id" element={<GameDetails />} />
        {/* Ruta dinámica que renderiza el componente SearchGame con un nombre de juego */}
        <Route path="/searchGame/:gameName" element={<SearchGame />} />
        {/* Ruta comodín que se utiliza para manejar rutas no definidas */}
        <Route path="*" element={<h1>Lo sentimos!! no hemos encontrado la ruta que has especificado</h1>} />
      </Routes>

      <footer className="text-center text-white bg-black">
        {/* Incluye el componente Footer en todas las páginas */}
        <Footer />
      </footer>
    </div>
  );
}

// Exporta la función App
export default App;
