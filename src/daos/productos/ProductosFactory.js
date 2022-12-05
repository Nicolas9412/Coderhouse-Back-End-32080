const ProductosDaoArchivos = require("./ProductosDaoArchivos");
const ProductosDaoFirebase = require("./ProductosDaoFirebase");
const ProductosDaoMemoria = require("./ProductosDaoMemoria");
const ProductosDaoMongoDb = require("./ProductosDaoMongoDb");

class ProductosFactoryDAO {
  static get(tipo) {
    switch (tipo) {
      case "MEM":
        return new ProductosDaoMemoria();
      case "FILE":
        return new ProductosDaoArchivos();
      case "MONGO":
        return new ProductosDaoMongoDb();
      case "FIREBASE":
        return new ProductosDaoFirebase();
      default:
        return new ProductosDaoMemoria();
    }
  }
}
module.exports = ProductosFactoryDAO;
