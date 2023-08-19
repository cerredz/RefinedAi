const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
  },
  picturePath: {
    type: String,
  },
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
