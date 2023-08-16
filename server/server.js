require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const authRoutes = require("./routes/auth");
const upscaleRoutes = require("./routes/upscale");
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/upscale", upscaleRoutes);

/* CONNECT TO MONGODB DATABASE */
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Port: ${PORT}`);
      console.log("Successfully Connected to the MongoDB Database");
    });
  })
  .catch((error) => {
    console.error("Error starting the server:", error);
  });