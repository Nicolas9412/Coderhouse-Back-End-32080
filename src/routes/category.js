const categoryRouter = require("express").Router();
const { authAdmin, auth } = require("../middlewares/auth");
const Category = require("../models/category");

categoryRouter.get("/", auth, async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ status: "OK", data: categories });
  } catch (error) {
    res.status(500).json({ status: "FAILED", data: { error } });
  }
});

categoryRouter.post("/", authAdmin, async (req, res) => {
  const category = new Category({
    name: req.body.name,
  });
  const result = await category.save();
  const { ...data } = await result.toJSON();
  res.status(200).json({ status: "OK", data });
});

categoryRouter.put("/:id", authAdmin, async (req, res) => {
  const { id } = req.params;
  const category = new Category({
    name: req.body.name,
  });
  try {
    await Category.findByIdAndDelete(id);
  } catch (error) {
    res.status(500).json({ status: "FAILED", data: { error } });
  }
  const result = await category.save();
  const { ...data } = await result.toJSON();
  res.status(200).json({ status: "OK", data });
});

categoryRouter.delete("/:id", authAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    await Category.findByIdAndDelete(id);
    res.status(200).json({ status: "OK" });
  } catch (error) {
    res.status(400).json({ status: "FAILED", data: { error } });
  }
});

module.exports = categoryRouter;
