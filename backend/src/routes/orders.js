const ordersRouter = require("express").Router();
const Order = require("../models/order");
const Cart = require("../models/cart");
const Product = require("../models/product");

ordersRouter.get("/", async (req, res) => {
  const orders = await Order.find();
  res.status(200).json({ status: "OK", data: orders });
});

ordersRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    res.status(200).json({ status: "OK", data: order });
  } catch (error) {
    res.status(400).json({
      status: "FAILED",
      data: { error: "this order not exists" },
    });
  }
});

ordersRouter.post("/generar", async (req, res) => {
  const cart = await Cart.findOne({ email: req.body.email });
  const products = await Product.find();
  for (const product of products) {
    for (const itemcart of cart.products) {
      if (product._id.toString() == itemcart._id.toString()) {
        if (!(itemcart.quantity <= product.stock)) {
          return res.status(400).json({
            status: "FAILED",
            data: { error: `We've ${product.stock} ${product.title}` },
          });
        }
      }
    }
  }
  for (const product of products) {
    for (const itemcart of cart.products) {
      if (product._id.toString() == itemcart._id.toString()) {
        const productUpdated = new Product({
          title: product.title,
          description: product.description,
          price: product.price,
          thumbnail: product.thumbnail,
          stock: product.stock - itemcart.quantity,
          category: product.category,
        });
        await Product.findByIdAndDelete(product._id.toString());
        await productUpdated.save();
      }
    }
  }
  const orderCount = await Order.countDocuments();
  if (cart) {
    if (cart.products.length != 0) {
      const order = new Order({
        products: [...cart.products],
        numberOrder: orderCount + 1,
        datetime: Date.now(),
        state: "generada",
        email: req.body.email,
      });
      const result = await order.save();
      await Cart.findByIdAndDelete(cart._id);
      const { ...data } = await result.toJSON();
      res.status(200).json({ status: "OK", data });
    } else {
      res
        .status(400)
        .json({ status: "FAILED", data: { error: "this cart is empthy" } });
    }
  } else {
    res
      .status(404)
      .json({ status: "NOT FOUND", data: { error: "this cart not exists" } });
  }
});

module.exports = ordersRouter;
