const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv/config");

console.log(process.env.DB_USER)

const app = express();
const PORT = process.env.port || 3000;
const router = express.Router();

// DB config
mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-bkb6b.mongodb.net/test?retryWrites=true&w=majority`, 
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// App config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middlewares
router.use(function(req, res, next) {
  console.log("Intercepted by Middlware!");
  next();
});

// Routes
router.get("/", (req, res) => {
  res.json({ message: "Test route ok!" });
});

// Config router
app.use("/api", router);

// Start app
app.listen(PORT, () => {
  console.log("server is up and running");
});
