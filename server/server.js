require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

/* ROUTES */
app.use("/auth", authRoutes);

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
