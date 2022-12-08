const config = require("../config");
const ProductsFactoryDAO = require("../model/DAOs/products/productsFactory");
const Products = require("../model/models/products");

class ProductsApi {
  constructor() {
    this.ProductsDAO = ProductsFactoryDAO.get(config.TIPO_PERSISTENCIA);
  }

  async getProducts(id) {
    return await this.ProductsDAO.getProducts(id);
  }

  async saveProduct(product) {
    ProductsApi.ensureValidProduct(product, true);
    return await this.ProductsDAO.saveProduct(product);
  }

  async updateProduct(id, product) {
    ProductsApi.validate(product, true);
    return await this.ProductsDAO.updateProduct(id, product);
  }

  async deleteProduct(id) {
    return await this.ProductsDAO.deleteProduct(id);
  }

  static ensureValidProduct(product, required) {
    try {
      Products.validate(product, required);
    } catch (error) {
      throw new Error(
        "El producto posee un formato json invalido o falta datos" +
          error.details[0].message
      );
    }
  }
}

module.exports = ProductsApi;
