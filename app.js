const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const stuffRoutes = require("./routes/stuff");
const userRoutes = require("./routes/user");
const path = require("path");

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));

const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://user-random:JaSBILhV34yrBZq2@cluster0.snlkboy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

app.use("/api/stuff", stuffRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
