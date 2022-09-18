const schemaCarrito = require("../../../utils/modelsMDB/schemaCarrito");
const ContenedorMongoDb = require("../../contenedores/ContenedorMongoDb");

class CarritosDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super(schemaCarrito);
  }
}

module.exports = CarritosDaoMongoDb;
