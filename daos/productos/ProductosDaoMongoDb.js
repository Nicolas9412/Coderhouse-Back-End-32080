const ProductoSchema = require("../modelsMDB/schemaProducto");
const ContenedorMongoDb = require("../../contenedores/ContenedorMongoDb");

class ProductosDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super(ProductoSchema);
  }
}

module.exports = ProductosDaoMongoDb;
