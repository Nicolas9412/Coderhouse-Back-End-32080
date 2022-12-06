const ContenedorMemoria = require("../../Contenedores/ContenedorMemoria");

let instance = null;

class ProductosDaoMemoria extends ContenedorMemoria {
  constructor() {
    super("productos");
  }
  static getInstance() {
    if (!instance) {
      instance = new ProductosDaoMemoria();
    }
    return instance;
  }
}

module.exports = ProductosDaoMemoria;
