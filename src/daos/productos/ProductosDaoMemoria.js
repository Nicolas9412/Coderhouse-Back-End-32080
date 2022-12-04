const ContenedorMemoria = require("../../Contenedores/ContenedorMemoria");

class ProductosDaoMemoria extends ContenedorMemoria {
  constructor() {
    super("productos");
  }
}

module.exports = ProductosDaoMemoria;
