import axios from "axios";

  // Gets all drinks
  function getDrinks() {
    return axios.get("/api/drinks");
  }
  // Gets the drink with the given id
  function getDrink(id) {
    return axios.get("/api/drinks/" + id);
  }
  // Deletes the drink with the given id
  function deleteDrink(id) {
    return axios.delete("/api/drinks/" + id);
  }
  // Saves a drink to the database
  function saveDrink(drinkData) {
    return axios.post("/api/drinks", drinkData);
  }
  // Updates a drink by id
  function updateDrink (id, drinkData) {
    return axios.put("/api/drinks/" + id, drinkData);
  }
  // Gets all inventory
  function getInventory() {
    return axios.get("/api/inventory");
  }
  // Gets the drink with the given id
  function getInventoryItem(id) {
    return axios.get("/api/inventory/" + id);
  }
  // Deletes the drink with the given id
  function deleteInventory(id) {
    return axios.delete("/api/inventory/" + id);
  }
  // Saves a drink to the database
  function saveInventory(inventoryData) {
    return axios.post("/api/inventory", inventoryData);
  }
  // Updates a drink by id
  function updateInventory (id, inventoryData) {
    return axios.put("/api/inventory/" + id, inventoryData);
  }
   // Gets all inventory
   function getRecipes() {
    return axios.get("/api/recipes");
  }
  // Gets the drink with the given id
  function getRecipe(id) {
    return axios.get("/api/recipes/" + id);
  }
  // Deletes the drink with the given id
  function deleteRecipe(id) {
    return axios.delete("/api/recipes/" + id);
  }
  // Saves a drink to the database
  function saveRecipe(recipeData) {
    return axios.post("/api/recipes", recipeData);
  }
  // Updates a drink by id
  function updateRecipe (id, recipeData) {
    return axios.put("/api/recipes/" + id, recipeData);
  }
const API = { getDrink, getDrinks, deleteDrink, saveDrink, updateDrink, 
  getInventory, getInventoryItem, saveInventory, deleteInventory, updateInventory,
  getRecipe, getRecipes, deleteRecipe, saveRecipe, updateRecipe
};

export default API;