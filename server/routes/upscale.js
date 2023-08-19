const express = require("express");
const User = require("../models/User");
const Image = require("../models/Image");
const path = require("path");
const multer = require("multer");
const crypto = require("crypto");

const randomString = crypto.randomBytes(20).toString("hex"); //not perfect, but limits the chances of files having the same path
/* MULTER SETUP (File Storage)*/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, randomString + file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post("/image", upload.single("picture"), async (req, res) => {
  try {
    console.log(req.body);
    const { userString } = req.body;
    const jsonUser = JSON.parse(userString); //parsed json user object
    console.log(jsonUser);

    const imagePath = randomString + encodeURIComponent(req.file.originalname); //path that is stored in the backend storage
    const userId = jsonUser._id;

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ msg: "User Not Found" });

    /* Store Image Into Database */
    const newImage = new Image({
      userID: userId,
      picturePath: imagePath,
    });

    await newImage.save();

    /* Update User's Information */
    user.images.push(imagePath);
    user.credits = user.credits - 1;

    await user.save();

    return res.status(200).json({
      user: user,
      image: imagePath,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

/* Send Image to Frontend*/
router.get("/Public/assets/:path", async (req, res) => {
  try {
    /* Construct Path of Image in Backend*/
    const imagePath = req.params.path;
    const absoluteImagePath = path.join(
      __dirname,
      "..",
      "public",
      "assets",
      imagePath
    );

    /* Send Image File to Frontend */
    res.sendFile(absoluteImagePath);
  } catch (err) {
    console.log(err);
    res.status(500).json("Failed to Extract Image");
  }
});

module.exports = router;
