const express = require("express");
const User = require("../models/User");
const Image = require("../models/Image");
const path = require("path");
const multer = require("multer");

/* MULTER SETUP (File Storage)*/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Public/assets");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post("/image", upload.single("picture"), async (req, res) => {
  try {
    console.log("Attempting to Upload image...");

    const { userString } = req.body;
    const jsonUser = JSON.parse(userString); //parsed json user object

    const imagePath = Date.now() + req.file.originalname; //path that is stored in the backend storage

    const userId = jsonUser._id;
    console.log(userId);
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ msg: "User Not Found" });
    const newImage = new Image({
      userID: userId, // Change this line
      picturePath: imagePath,
    });

    await newImage.save();

    user.images.push(imagePath);

    await user.save();

    return res.status(200).json({ user, newImage });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;
