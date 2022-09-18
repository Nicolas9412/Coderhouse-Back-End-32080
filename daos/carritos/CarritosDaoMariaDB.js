const ContenedorRelacional = require("../../contenedores/ContenedorRelacional");

class CarritosDaoMariaDB extends ContenedorRelacional {
  constructor() {
    super("carritos");
  }
}

module.exports = CarritosDaoFirebase;
