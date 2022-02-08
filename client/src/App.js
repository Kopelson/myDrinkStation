import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Drinks from "./pages/Drinks/index";
import Detail from "./pages/Detail/index";
import Create from "./pages/Create/index";
import NoMatch from "./pages/NoMatch/index";
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
          <Route exact path="/" element={<Drinks />}/>
          <Route exact path="/drinks/:id" element={<Detail />}/>
          <Route exact path="/create" element={<Create />}/>
          <Route exact path="/inventory" element={<Inventory />}/>
          <Route exact path="/addItem" element={<AddItem />}/>
          <Route exact path="/inventory/:id" element={<ItemDetail />}/>
          <Route exact path="/recipes" element={<Recipes />}/>
          <Route exact path="/addRecipes" element={<AddRecipe />} />
          <Route exact path="/recipes/:id" element={<RecipeDetail />} />
          <Route path="*" element={<NoMatch />} /> 
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;