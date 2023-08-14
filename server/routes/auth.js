const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

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

//function to register a new user
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

module.exports = router;
