const express = require("express");
const router = express.Router();

const Product = require("../app/models/product");

router.post("/", (req, res) => {
  const { name, price, description } = req.body;
  const product = new Product();

  product.name = name;
  product.price = price;
  product.description = description;

  product.save(error => {
    if (error) res.send("[Error] failed to save product: " + error);

    res.status(201).json({ message: "Product created succesfully!" });
  });
});

module.exports = router;
