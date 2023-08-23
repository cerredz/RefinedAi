const express = require("express");
const User = require("../models/User");
const Image = require("../models/Image");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const multer = require("multer");
const crypto = require("crypto");
const path = require("path");

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

//function to check if a username exists in the usernames taken already
router.get("/check/:username", async (req, res) => {
  try {
    const attemptedUsername = req.params.username;
    const user = await User.findOne({ username: attemptedUsername });

    if (!user) return res.status(200).send(false); //user does not exist
    if (user) return res.status(200).send(true); //user exists
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

/* ADD A USER TO THE DATABASE */
router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, username, password, accountCreated } =
      req.body;
    //checks if the email is already associated with an account
    const emailExists = await User.findOne({ email: email });
    if (emailExists) {
      res.status(200).send(false);
      return;
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password: passwordHash,
      picturePath: "",
      credits: accountCreated ? 0 : 20,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//function to login an existing user
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username);
    console.log(password);

    const user = await User.findOne({ username: username });
    if (!user) return res.status(200).send({ msg: "Incorrect Username" });

    let isMatchingPassword = null;

    if (user) {
      isMatchingPassword = await bcrypt.compare(password, user.password);
    }

    if (!isMatchingPassword)
      return res.status(200).send({ msg: "Incorrect Password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_TOKEN);
    delete user.password;
    res.status(200).send({ token, user });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err.message });
  }
});

/* ATTEMPTS TO CHANGE A USER'S PASSWORD */
router.post("/changePassword", async (req, res) => {
  try {
    const { userID, currentPassword, newPassword } = req.body;

    const user = await User.findById(userID);
    /* USER NOT FOUND */
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const isMatchingPassword = await bcrypt.compare(
      currentPassword,
      user.password
    );

    /* USER DID NOT INPUT CORRECT PASSWORD */
    if (!isMatchingPassword) {
      return res.status(200).json({ res: false });
    }

    /* UPDATE PASSWORD FOR USER */
    const salt = await bcrypt.genSalt();
    const newPasswordHash = await bcrypt.hash(newPassword, salt);

    user.password = newPasswordHash;
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_TOKEN);
    delete user.password;
    res.status(200).json({ res: true, user: user, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Failed to update password" });
  }
});

/* SENDS ALL IMAGES A USER HAS UPSCALED TO THE FRONTEND */
router.post("/retrieveImages", async (req, res) => {
  try {
    const { userID } = req.body;
    const user = await User.findById(userID);

    /* INVALID USER ID */
    if (!user) return res.status(401).json("Invalid User ID");

    /* RETURN ALL IMAGES WITH INPUTTED USER ID */
    const images = await Image.find({ userID: userID });
    res.status(201).json(images);
  } catch (err) {
    console.log(err);
    res.status(500).json("Error Retrieving User Images");
  }
});

/* CHANGE PROFILE PICTURE OF A USER */
router.post(
  "/changeProfilePicture",
  upload.single("picture"),
  async (req, res) => {
    try {
      /* CONVERT USER TO JSON */
      const { user } = req.body;
      const userJSON = JSON.parse(user);

      const { _id } = userJSON;

      const findUser = await User.findById(_id);
      if (!findUser) return res.status(404).json("User Not Found");

      /* UPDATE PROFILE PICTURE PATH FOR USER */
      const imagePath =
        randomString + encodeURIComponent(req.file.originalname); //path that is stored in the backend storage

      findUser.picturePath = `${process.env.BACKEND_IMAGE_STORAGE}/${imagePath}`;
      await findUser.save();
      res.status(200).json(findUser);
    } catch (err) {
      console.log(err);
      res.status(500).json("Failed To Change Profile Picture");
    }
  }
);

module.exports = router;
