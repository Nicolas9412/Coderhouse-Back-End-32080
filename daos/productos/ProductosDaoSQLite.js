const ContenedorRelacional = require("../../contenedores/ContenedorRelacional");
const { knexSQLite3 } = require("../../config");

class ProductosDaoSQLite3 extends ContenedorRelacional {
  constructor() {
    super(knexSQLite3, "productos");
  }
}

module.exports = ProductosDaoSQLite3;
