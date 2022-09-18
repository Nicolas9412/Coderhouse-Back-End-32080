const ContenedorRelacional = require("../../contenedores/ContenedorRelacional");
const { knexSQLite3 } = require("../../config");

class CarritosDaoSQLite3 extends ContenedorRelacional {
  constructor() {
    super(knexSQLite3, "carritos");
  }
}

module.exports = CarritosDaoSQLite3;
