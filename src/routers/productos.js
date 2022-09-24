const express = require("express");
const {
  getAllProducts,
  getProductById,
  addProduct,
  deleteProductById,
  updateProductById,
  checkAdmin,
} = require("../controllers/productosController");

const routerProductos = express.Router();

routerProductos.get("/", getAllProducts);
routerProductos.get("/:id", getProductById);
routerProductos.post("/", checkAdmin, addProduct);
routerProductos.put("/:id", checkAdmin, updateProductById);
routerProductos.delete("/:id", checkAdmin, deleteProductById);

module.exports = routerProductos;
