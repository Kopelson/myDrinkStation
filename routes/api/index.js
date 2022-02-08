const router = require("express").Router();
const drinkRoutes = require("./drinks");
const inventoryRoutes = require("./inventory");
const recipeRoutes = require("./recipes")

// Drink routes
router.use("/drinks", drinkRoutes);
router.use("/inventory", inventoryRoutes);
router.use("/recipes", recipeRoutes)

module.exports = router;