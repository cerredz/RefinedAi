const express = require("express");
const Prices = require("../models/Prices");

const router = express.Router();

/* FUNCTION TO SEND ALL PRICES TO THE FRONTEND */
router.get("/getAllPrices", async (req, res) => {
  try {
    const allPrices = await Prices.find({}, { _id: 0 });
    if (!allPrices) return res.status(404).json("Prices Not Found");
    res.status(200).json(allPrices);
  } catch (err) {
    console.log(err);
    res.status(500).json("Failed To Send Price Information to the Frontend");
  }
});

/* FUNCTION TO PURCHASE CREDITS FOR A USER */
router.post("/purchase", async (req, res) => {
  //extract user and id from the frontend
  //check if the id matches the id of the price in the backend
  //if id matches, get price from the backend, not the one passed from the frontend
});
module.exports = router;
