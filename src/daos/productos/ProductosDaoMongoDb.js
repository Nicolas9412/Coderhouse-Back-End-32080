const schemaProducto = require("../../models/schemaProducto");
const ContenedorMongoDb = require("../../Contenedores/ContenedorMongoDb");

class ProductosDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super(schemaProducto);
  }
}

module.exports = ProductosDaoMongoDb;
