const ordersRouter = require("express").Router();
const Order = require("../models/order");
const Cart = require("../models/cart");
const Product = require("../models/product");
const { sendMail } = require("../utils/sendMail");

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

ordersRouter.post("/finalizar", async (req, res) => {
  const orderToFinish = await Order.findById(req.body.idOrder);
  if (orderToFinish) {
    const orderToFinished = new Order({
      products: orderToFinish.products,
      numberOrder: orderToFinish.numberOrder,
      datetime: orderToFinish.datetime,
      state: "finalizada",
      email: orderToFinish.email,
    });
    try {
      await Order.findByIdAndDelete(orderToFinish);
    } catch (error) {
      return res.status(500).json({ status: "FAILED", data: { error } });
    }
    const result = await orderToFinished.save();
    await sendMail(
      orderToFinish.email,
      "Order finish",
      `<div>
          <p style="font-size:32px;font-weight:800;">#${
            orderToFinish.numberOrder
          }</p>
          <p style="font-size:16px;font-weight:500;">User: ${
            orderToFinish.email
          }</p>
          <p style="font-size:16px;font-weight:500;">Date order
            ${new Date(orderToFinish.datetime).toLocaleDateString()}
            ${new Date(orderToFinish.datetime).toLocaleTimeString()}
          </p>
          ${orderToFinish.products.map(
            (item) => `
            <div style="width:100%;display:flex;justify-content:space-evenly;">
              <div style="width:100px;display:flex;flex-direction:column;justify-content:center;align-items:center;">
                <img width=60 height=60 src="${item.thumbnail}"/>
              </div>
              <div style="width:200px;display:flex;flex-direction:column;">
                <p>Name</p>
                <p>${item.title}</p>
              </div>
              <div style="width:150px;display:flex;flex-direction:column;">
                <p>Price</p>
                <p>${item.price}</p>
              </div>
              <div style="width:150px;display:flex;flex-direction:column;">
                <p>Quantity</p>
                <p>${item.quantity}</p>
              </div>
              <div style="width:150px;display:flex;flex-direction:column;">
                <p>Total</p>
                <p>${item.price * item.quantity}</p>
              </div>
            </div>`
          )}
          <div style="display:flex;justify-content:end;">
              <p style="width:150px;font-size:20px;font-weight:800;">Total $ ${orderToFinish.products
                .map((item) => item.price * item.quantity)
                .reduce((acc, current) => acc + current, 0)}
              </p>
          </div>
      </div>`
    );
    const { ...data } = await result.toJSON();
    return res.status(200).json({ status: "OK", data });
  } else {
    return res
      .status(404)
      .json({ status: "NOT FOUND", data: { error: "this order not exists" } });
  }
});

module.exports = ordersRouter;
