const ContenedorFirebase = require("../../Contenedores/ContenedorFirebase");

class ProductosDaoFirebase extends ContenedorFirebase {
  constructor() {
    super("productos");
  }
}

module.exports = ProductosDaoFirebase;
