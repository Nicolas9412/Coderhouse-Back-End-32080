const ContenedorRelacional = require("../../contenedores/ContenedorRelacional");
const { knexMariaDB } = require("../../../config");

class CarritosDaoMariaDB extends ContenedorRelacional {
  constructor() {
    super(knexMariaDB, "carritos");
  }
}

module.exports = CarritosDaoMariaDB;
