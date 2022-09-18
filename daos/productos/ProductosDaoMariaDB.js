const ContenedorRelacional = require("../../contenedores/ContenedorRelacional");
const { knexMariaDB } = require("../../config");

class ProductosDaoMariaDB extends ContenedorRelacional {
  constructor() {
    super(knexMariaDB, "productos");
  }
}

module.exports = ProductosDaoMariaDB;
