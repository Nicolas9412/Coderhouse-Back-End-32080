const ContenedorArchivos = require("../../Contenedores/ContenedorArchivos");

class ProductosDaoArchivo extends ContenedorArchivos {
  constructor() {
    super("./db/productos.json");
  }
}

module.exports = ProductosDaoArchivo;
