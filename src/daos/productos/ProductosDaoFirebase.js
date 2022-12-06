const ContenedorFirebase = require("../../Contenedores/ContenedorFirebase");

let instance = null;

class ProductosDaoFirebase extends ContenedorFirebase {
  constructor() {
    super("productos");
  }
  static getInstance() {
    if (!instance) {
      instance = new ProductosDaoFirebase();
    }
    return instance;
  }
}

module.exports = ProductosDaoFirebase;
