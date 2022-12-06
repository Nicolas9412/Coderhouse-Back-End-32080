const schemaProducto = require("../../models/schemaProducto");
const ContenedorMongoDb = require("../../contenedores/ContenedorMongoDb");

let instance = null;

class ProductosDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super(schemaProducto);
  }
  static getInstance() {
    if (!instance) {
      instance = new ProductosDaoMongoDb();
    }
    return instance;
  }
}

module.exports = ProductosDaoMongoDb;
