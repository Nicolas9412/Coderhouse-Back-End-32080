const express = require("express");
const {
  getAllProductsByCartId,
  createCart,
  addProduct,
  deleteCartById,
  deleteProductById,
} = require("../controllers/carritoController");

const routerCarrito = express.Router();

routerCarrito.post("/", createCart);
routerCarrito.delete("/:id", deleteCartById);
routerCarrito.get("/:id/productos", getAllProductsByCartId);
routerCarrito.post("/:id/productos", addProduct);
routerCarrito.delete("/:id/productos/:id_prod", deleteProductById);

module.exports = routerCarrito;
