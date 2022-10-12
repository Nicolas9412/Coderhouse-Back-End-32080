const schemaUsuario = require("../../../models/usuarios");
const ContenedorMongoDb = require("../../contenedores/ContenedorMongoDb");

class UsuariosDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super(schemaUsuario);
  }
}

module.exports = UsuariosDaoMongoDb;
