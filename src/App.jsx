import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Header from "./Components/Header";
import SearchGame from "./Components/SearchGame";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="App">
      <header>
        {/* Incluimos el componente Header */}
        <Header />
      </header>
      <Routes>
        {/* La ruta raiz será el componente Home */}
        <Route path="/" element={<Home />} />
        {/* La ruta /searchByName incluirá el componente SearchByName */}
        <Route path="/searchByName" element={<Home />} />
        {/* La ruta /searchByIngredient incluirá el componente SearchByIngredient */}
        <Route path="/searchByIngredient" element={<Home />} />
        {/* Esta ruta /meal/id incluirá el componente MealDetails con su id corresponiendte */}
        <Route path="/meal/:id" element={<Home />} />
        {/* La ruta /ingredient-recipes/ingredient incluirá el componente
        IngredientRecipesPage con el resultado de las comidas que contienen ese ingrediente */}
        <Route path="/ingredient-recipes/:ingredient" element={<Home />} />

        <Route path="/searchGame/:gameName" element={<SearchGame />} />
        {/* Cualquier ruta introducida que no sea alguna de las de arriba
        informará al usuario de que la página no se ha encontrado */}
        <Route path="*" element={<h1>Lo sentimos!! no hemos encontrado la ruta que has especificado</h1>} />
      </Routes>

      <footer class="text-center text-white bg-black">
        {/* Incluimos el componente Header */}
        <Footer />
      </footer>
    </div>
  );
}

export default App;
