require('dotenv').config();
const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Drinks collection and inserts the drinks below
mongoose.connect(
  process.env.MONGODB_URI, 
  { 
    useUnifiedTopology: true,
    useNewUrlParser: true,
    tlsCAFile: "./ca-certificate.crt"
  }  
);

const drinkSeed = [
  {
    title: "Montana Mama",
    author: "Gwendalyn",
    ingredients:
      "raspberry soda, orange juice, coconut",
    date: new Date(Date.now())
  },
  {
    title: "The 406",
    author: "Gwendalyn",
    ingredients:
      "Dr Pepper, huckleberry, coconut",
    date: new Date(Date.now())
  },
  {
    title: "Butter Beer Supreme",
    author: "Gwendalyn",
    ingredients:
      "cream soda, butter rum, butterscotch, cream",
    date: new Date(Date.now())
  }
];

db.Drink
  .deleteMany({})
  .then(() => db.Drink.collection.insertMany(drinkSeed))
  .then(data => {
    console.log(data.insertedCount + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });