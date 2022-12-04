const ContenedorArchivos = require("../../Contenedores/ContenedorArchivos");

class ProductosDaoArchivos extends ContenedorArchivos {
  constructor() {
    super("./db/productos.json");
  }
}

module.exports = ProductosDaoArchivos;
