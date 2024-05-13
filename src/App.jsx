import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Header from "./Components/Header";
import SearchGame from "./Components/SearchGame";
import Footer from "./Components/Footer";
import GameDetails from "./Components/GameDetails";

import "./App.css";
import About from "./Components/About";
import Contact from "./Components/Contact";
import InterestingTitles from "./Components/Interesting Titles/InterestingTitles";
import BestDeals from "./Components/BestDeals";
import NewDeals from "./Components/NewDeals";

function App() {
  return (
    <div className="App">
      {/* Incluimos el componente Header */}
      <Header />
      <Routes>
        {/* La ruta raiz será el componente Home */}
        <Route path="/" element={<Home />} />
        {/* La ruta /searchByName incluirá el componente SearchByName */}
        <Route path="/interesting titles" element={<InterestingTitles />} />
        {/* La ruta /searchByIngredient incluirá el componente SearchByIngredient */}
        <Route path="/best deals" element={<BestDeals />} />
        <Route path="/new deals" element={<NewDeals />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* Esta ruta /meal/id incluirá el componente MealDetails con su id corresponiendte */}
        <Route path="/game/:id" element={<GameDetails />} />
        {/* La ruta /ingredient-recipes/ingredient incluirá el componente
        IngredientRecipesPage con el resultado de las comidas que contienen ese ingrediente */}
        <Route path="/ingredient-recipes/:ingredient" element={<Home />} />

        <Route path="/searchGame/:gameName" element={<SearchGame />} />
        {/* Cualquier ruta introducida que no sea alguna de las de arriba
        informará al usuario de que la página no se ha encontrado */}
        <Route path="*" element={<h1>Lo sentimos!! no hemos encontrado la ruta que has especificado</h1>} />
      </Routes>

      <footer className="text-center text-white bg-black">
        {/* Incluimos el componente Header */}
        <Footer />
      </footer>
    </div>
  );
}

export default App;
