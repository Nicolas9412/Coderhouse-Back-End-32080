const ContenedorArchivo = require("../../contenedores/ContenedorArchivo");

class CarritosDaoArchivo extends ContenedorArchivo {
  constructor() {
    super("./db/carritos.json");
  }
}

module.exports = CarritosDaoArchivo;
