const ContenedorMemoria = require("../../contenedores/ContenedorMemoria");

class CarritosDaoMemoria extends ContenedorMemoria {
  constructor() {
    super("carritos");
  }
}

module.exports = CarritosDaoMemoria;
