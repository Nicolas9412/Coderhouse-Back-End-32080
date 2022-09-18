const ContenedorArchivo = require("../../contenedores/ContenedorArchivo");

class CarritosDaoArchivo extends ContenedorArchivo {
  constructor() {
    super("carritos.json");
  }
}

module.exports = CarritosDaoArchivo;
