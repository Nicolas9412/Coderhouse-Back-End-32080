const ContenedorArchivo = require("../../contenedores/ContenedorArchivo");

class ProductosDaoArchivo extends ContenedorArchivo {
  constructor() {
    super("./db/productos.json");
  }
}

module.exports = ProductosDaoArchivo;
