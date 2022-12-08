const { Router } = require("express");
const ProductsController = require("../controllers/products.js");

const router = Router();

class ProductsRouter {
  constructor() {
    this.productsController = new ProductsController();
  }

  start() {
    router.get("/:id?", this.productsController.getProducts);
    router.post("/", this.productsController.saveProduct);
    router.put("/:id", this.productsController.updateProduct);
    router.delete("/:id", this.productsController.deleteProduct);

    return router;
  }
}

export default ProductsRouter;
