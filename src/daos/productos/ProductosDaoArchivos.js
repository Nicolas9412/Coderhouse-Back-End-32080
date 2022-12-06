const ContenedorArchivos = require("../../Contenedores/ContenedorArchivos");

let instance = null;

class ProductosDaoArchivos extends ContenedorArchivos {
  constructor() {
    super("./db/productos.json");
  }
  static getInstance() {
    if (!instance) {
      instance = new ProductosDaoArchivos();
    }
    return instance;
  }
}

module.exports = ProductosDaoArchivos;
