const ContenedorRelacional = require("../../contenedores/ContenedorRelacional");
const { knexSQLite3 } = require("../../../config");

class CarritosDaoSQLite extends ContenedorRelacional {
  constructor() {
    super(knexSQLite3, "carritos");
  }
}

module.exports = CarritosDaoSQLite;
