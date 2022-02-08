import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Drinks from "./pages/Drinks";
import Detail from "./pages/Detail";
import Create from "./pages/Create";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Header";
import Footer from "./components/Footer";
import Inventory from "./pages/Inventory";
import AddItem from "./pages/AddItems";
import ItemDetail from "./pages/ItemDetail";
import Recipes from "./pages/Recipes";
import AddRecipe from "./pages/AddRecipes";
import RecipeDetail from "./pages/RecipeDetail";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Routes>
        <Route path="/" element={<Drinks/>} />
          <Route path="/drinks" element={<Drinks />} />
          <Route path="/drinks/:id" element={<Detail />} />
          <Route path="/create" element={ <Create />}/>
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/addItem" element={<AddItem />} />
          <Route path="/inventory/:id" element={<ItemDetail />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/addRecipes" element={<AddRecipe />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
          <Route path="*" element={<NoMatch />} /> 
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;