const ContenedorRelacional = require("../../contenedores/ContenedorRelacional");
const { knexSQLite3 } = require("../../../config");

class ProductosDaoSQLite extends ContenedorRelacional {
  constructor() {
    super(knexSQLite3, "productos");
  }
}

module.exports = ProductosDaoSQLite;
