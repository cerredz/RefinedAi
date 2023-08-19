const express = require("express");
const Review = require("../models/Reviews");
const User = require("../models/User");

const router = express.Router();

/* POST REVIEW TO BACKEND */
router.post("/create", async (req, res) => {
  try {
    const { user, description, stars } = req.body;
    const { _id, username, picturePath } = user;

    console.log(_id);
    console.log(username);

    /* ADD REVIEW TO REVIEWS BACKEND */
    const newReview = new Review({
      userID: _id,
      username: username,
      description: description,
      stars: stars,
      picturePath: picturePath,
    });

    await newReview.save();

    /* ADD REVIEW TO USER'S REVIEWS */
    const userData = await User.findOne({ _id: _id });
    userData.reviews.push(newReview);
    await userData.save();

    /* SEND BACK NEW REVIEW BACKEND TO FRONTEND*/
    const allReviews = await Review.find({ stars: 5 });
    res.status(201).json(allReviews);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Could Not Post Review" });
  }
});

/* GET REVIEWS FROM BACKEND */
router.get("/getReviews", async (req, res) => {
  try {
    const reviews = await Review.find({ stars: 5 });
    res.status(200).json(reviews);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Could Not Retrieve Reviews" });
  }
});

module.exports = router;
