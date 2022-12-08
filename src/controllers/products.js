const ProductsApi = require("../api/products");

class ProductsController {
  constructor() {
    this.productsApi = new ProductsApi();
  }

  async getProducts(req, res) {
    try {
      let id = req.params.id;
      let products = await this.productsApi.getProducts(id);
      res.json(products);
    } catch (error) {
      console.log("Error al obtener los productos", error);
    }
  }

  async saveProduct(req, res) {
    try {
      let { title, price, thumbnail } = req.body;
      const product = { title, price, thumbnail };
      let productSaved = await this.productsApi.saveProduct(product);
      res.json(productSaved);
    } catch (error) {
      console.log("Error al guardar un producto", error);
    }
  }

  async updateProduct(req, res) {
    try {
      let { title, price, thumbnail } = req.body;
      let product = { title, price, thumbnail };
      let id = req.params.id;
      let productUpdated = await this.productsApi.updateProduct(product, id);
      res.json(productUpdated);
    } catch (error) {
      console.log("Error al actualizar un producto", error);
    }
  }

  async deleteProduct(req, res) {
    try {
      let id = req.params.id;
      let productDeleted = await this.productsApi.deleteProduct(id);
      res.json(productDeleted);
    } catch (error) {
      console.log("Error al borrar un producto", error);
    }
  }
}

module.exports = ProductsController;
