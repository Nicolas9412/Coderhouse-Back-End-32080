import { Router } from "../deps.ts";
import {
  createProduct,
  deleteProduct,
  findProduct,
  findProducts,
  updateProduct,
} from "../handlers/product.ts";
export const router = new Router()
  //Product routes
  .get("/api/products", findProducts)
  .get("/api/products/:productId", findProduct)
  .delete("/api/products/:productId", deleteProduct)
  .put("/api/products/:productId", updateProduct)
  .post("/api/products", createProduct);
