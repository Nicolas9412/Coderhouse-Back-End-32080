const CarritoSchema = require("../modelsMDB/schemaCarrito");
const ContenedorMongoDb = require("../../contenedores/ContenedorMongoDb");

class CarritosDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super(CarritoSchema);
  }
}

module.exports = CarritosDaoMongoDb;
