const ProductosDaoArchivos = require("./ProductosDaoArchivos");
const ProductosDaoFirebase = require("./ProductosDaoFirebase");
const ProductosDaoMemoria = require("./ProductosDaoMemoria");
const ProductosDaoMongoDb = require("./ProductosDaoMongoDb");

class ProductosFactoryDAO {
  static get(tipo) {
    switch (tipo) {
      case "MEM":
        return ProductosDaoMemoria.getInstance();
      case "FILE":
        return ProductosDaoArchivos.getInstance();
      case "MONGO":
        return ProductosDaoMongoDb.getInstance();
      case "FIREBASE":
        return ProductosDaoFirebase.getInstance();
      default:
        return ProductosDaoMemoria.getInstance();
    }
  }
}
module.exports = ProductosFactoryDAO;
