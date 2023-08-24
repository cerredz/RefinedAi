const mongoose = require("mongoose");

const pricesSchema = new mongoose.Schema({
  credits: {
    type: Number,
    required: true,
  },
  priceInCents: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  picturePath: {
    type: String,
    required: true,
  },
});

const Prices = mongoose.model("Prices", pricesSchema);
module.exports = Prices;
