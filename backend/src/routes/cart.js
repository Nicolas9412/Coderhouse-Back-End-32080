const cartRouter = require("express").Router();
const { auth } = require("../middlewares/auth");
const Cart = require("../models/cart");
const Product = require("../models/product");

cartRouter.get("/", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ email: req.body.email });
    res.status(200).json({ status: "OK", data: cart });
  } catch (error) {
    res.status(400).json({ status: "FAILED", data: { error } });
  }
});

cartRouter.post("/", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ email: req.body.email });
    const product = await Product.findById(req.body.idProduct);
    const productJson = await product.toJSON();
    const productIndexCart = cart?.products.findIndex(
      (item) => item._id == req.body.idProduct
    );
    const productAlreadyCart = cart?.products[productIndexCart];
    let productAdd = null;
    if (productAlreadyCart) {
      productAdd = {
        ...productAlreadyCart,
        quantity: req.body.quantity + productAlreadyCart.quantity,
      };
    } else {
      productAdd = { quantity: req.body.quantity, ...productJson };
    }
    if (product.stock >= productAdd.quantity) {
      if (cart) {
        if (productAlreadyCart) cart.products.splice(productIndexCart, 1);
        const cartUpdated = {
          _id: cart._id,
          email: req.body.email,
          datetime: Date.now(),
          products: [...cart.products, productAdd],
          address: req.body.address,
        };
        await Cart.findByIdAndUpdate(cart._id, cartUpdated);
        res.status(200).json({ status: "OK", data: cartUpdated });
      } else {
        const newCart = new Cart({
          email: req.body.email,
          datetime: Date.now(),
          products: [productAdd],
          address: req.body.address,
        });
        const result = await newCart.save();
        const { ...data } = await result.toJSON();
        res.status(200).json({ status: "OK", data });
      }
    } else {
      res.status(400).json({
        status: "FAILED",
        data: { error: "insufficient quantity of products" },
      });
    }
  } catch (error) {
    res.status(400).json({ status: "FAILED", data: { error: "todo mal" } });
  }
});

cartRouter.delete("/:idProduct", auth, async (req, res) => {
  const { idProduct } = req.params;
  try {
    const cart = await Cart.findOne({ email: req.body.email });
    if (cart) {
      const productIndexCart = cart.products.findIndex(
        (item) => item._id == idProduct
      );
      if (productIndexCart) {
        cart.products.splice(productIndexCart, 1);
        const cartUpdated = {
          _id: cart._id,
          email: req.body.email,
          datetime: Date.now(),
          products: [...cart.products],
          address: req.body.address,
        };
        const result = await Cart.findByIdAndUpdate(cart._id, cartUpdated);
        res.status(200).json({ status: "OK", data: result });
      } else {
        res
          .status(400)
          .json({ status: "FAILED", data: "this product not exists in cart" });
      }
    } else {
      res.status(400).json({ status: "FAILED", data: "this cart not exists" });
    }
  } catch (error) {
    res.status(500).json({ status: "FAILED SERVER", data: { error } });
  }
});

cartRouter.put("/:idProduct", auth, async (req, res) => {
  const { idProduct } = req.params;
  try {
    const cart = await Cart.findOne({ email: req.body.email });
    const productIndexCart = cart?.products.findIndex(
      (item) => item._id == idProduct
    );
    const productAlreadyCart = cart?.products[productIndexCart];
    let productAdd = null;
    if (productAlreadyCart) {
      productAdd = {
        ...productAlreadyCart,
        quantity: req.body.quantity,
      };
      if (cart) {
        if (productAlreadyCart) cart.products.splice(productIndexCart, 1);
        const cartUpdated = {
          _id: cart._id,
          email: req.body.email,
          datetime: Date.now(),
          products: [...cart.products, productAdd],
          address: req.body.address,
        };
        await Cart.findByIdAndUpdate(cart._id, cartUpdated);
        res.status(200).json({ status: "OK", data: cartUpdated });
      } else {
        res
          .status(400)
          .json({ status: "FAILED", data: { error: "this cart not exists" } });
      }
    } else {
      res
        .status(400)
        .json({ status: "FAILED", data: { error: "this product not exists" } });
    }
  } catch (error) {}
});

module.exports = cartRouter;
