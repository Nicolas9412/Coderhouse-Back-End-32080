const productAuth = require("express").Router();
const Product = require("../models/product");
const { auth, authAdmin } = require("../middlewares/auth");
const { validateProduct } = require("../validators/products");

productAuth.get("/", auth, async (req, res) => {
  const products = await Product.find();
  res.status(200).json({ status: "OK", data: products });
});

productAuth.post("/", authAdmin, validateProduct, async (req, res) => {
  const product = new Product({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    thumbnail: req.body.thumbnail,
    stock: req.body.stock,
    category: req.body.category,
  });
  const result = await product.save();
  const { ...data } = await result.toJSON();
  res.status(200).json({ status: "OK", data });
});

productAuth.put("/:id", authAdmin, validateProduct, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Product.findByIdAndUpdate(id, {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      thumbnail: req.body.thumbnail,
      stock: req.body.stock,
      category: req.body.category,
    });
    const { ...data } = await result.toJSON();
    res.status(200).json({ status: "OK", data });
  } catch (error) {
    res.status(500).json({ status: "FAILED", data: { error } });
  }
});

productAuth.delete("/:id", authAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ status: "OK" });
  } catch (error) {
    res.status(400).json({ status: "FAILED", data: { error } });
  }
});

productAuth.get("/:id", auth, async (req, res) => {
  const { id, categoria } = req.params;
  try {
    const product = await Product.findById(id);
    res.status(200).json({ status: "OK", data: product });
  } catch (error) {
    res.status(404).json({
      status: "NOT FOUND",
      data: { error: "this product not exists" },
    });
  }
});

productAuth.get("/categoria/:categoria", auth, async (req, res) => {
  const { categoria } = req.params;
  if (categoria) {
    try {
      const products = await Product.find({ category: categoria });
      if (products.length !== 0) {
        res.status(200).json({ status: "OK", data: products });
      } else {
        res.status(400).json({
          status: "FAILED",
          data: { error: "this category not exists" },
        });
      }
    } catch (error) {
      res.status(400).json({ status: "FAILED", data: { error } });
    }
  }
});

module.exports = productAuth;
