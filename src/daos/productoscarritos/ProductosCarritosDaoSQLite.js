const ContenedorRelacional = require("../../contenedores/ContenedorRelacional");
const { knexSQLite3 } = require("../../../config");

class ProductosCarritosDaoSQLite extends ContenedorRelacional {
  constructor() {
    super(knexSQLite3, "productoscarritos");
  }
}

module.exports = ProductosCarritosDaoSQLite;
