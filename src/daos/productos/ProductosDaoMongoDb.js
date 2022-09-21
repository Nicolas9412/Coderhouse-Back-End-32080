const schemaProducto = require("../../modelsMDB/schemaProducto");
const ContenedorMongoDb = require("../../contenedores/ContenedorMongoDb");

class ProductosDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super(schemaProducto);
  }
}

module.exports = ProductosDaoMongoDb;
