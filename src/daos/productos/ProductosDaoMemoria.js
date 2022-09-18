const ContenedorMemoria = require("../../contenedores/ContenedorMemoria");

class ProductosDaoMemoria extends ContenedorMemoria {
  constructor() {
    super("productos");
  }
}

module.exports = ProductosDaoMemoria;
