// app.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = require("./config/dbConfig");
const userRouter = require("./routes/userRoutes");
const messageRouter = require("./routes/messageRoutes");

const app = express();

// handle cors
app.use(cors());

// parsing body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// handling routes
app.use("/user", userRouter);
app.use("/message", messageRouter);

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Models synced!");
    app.listen(5000, () => {
      console.log("App is listening on http://localhost:5000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
