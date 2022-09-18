const ContenedorMemoria = require("../../contenedores/ContenedorMemoria");

class CarritosDaoMemoria extends ContenedorMemoria {
  constructor() {
    super("carrito");
  }
}

module.exports = CarritosDaoMemoria;
