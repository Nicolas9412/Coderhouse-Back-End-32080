const ContenedorRelacional = require("../../contenedores/ContenedorRelacional");
const { knexSQLite3 } = require("../../config");

class ProductosCarritosDaoSQLite3 extends ContenedorRelacional {
  constructor() {
    super(knexSQLite3, "ProductosCarritos");
  }
}

module.exports = ProductosCarritosDaoSQLite3;
