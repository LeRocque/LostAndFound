const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");

const itemController = require("./controllers/itemController");

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoURI = "mongodb://localhost/LostandFound";
mongoose.connect(mongoURI);

app.use("/build", express.static(path.join(__dirname, "../build")));

// handle get requests to root
app.get("/", (req, res) => {
  console.log("At server.js get to root");
  return res.status(200).sendFile(path.join(__dirname, "../index.html"));
});

// handle post requests to root
app.post("/api", itemController.addItem, (req, res) => {
  console.log("At server.js post to root");
  return res.status(200).send(res.locals.newItem);
});

// catch-all
app.use((req, res) =>
  res.status(404).send("This is not the page you're looking for...")
);

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.message);
  return res.status(errorObj.status).json(errorObj.log);
});

// server start
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
