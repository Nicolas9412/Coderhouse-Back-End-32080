const ContenedorRelacional = require("../../contenedores/ContenedorRelacional");
const { knexMariaDB } = require("../../../config");

class ProductosCarritosDaoMariaDB extends ContenedorRelacional {
  constructor() {
    super(knexMariaDB, "productoscarritos");
  }
}

module.exports = ProductosCarritosDaoMariaDB;
