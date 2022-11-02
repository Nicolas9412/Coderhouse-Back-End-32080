const schemaMensaje = require("../../models/schemaMensaje");
const ContenedorMongoDb = require("../../Contenedores/ContenedorMongoDb");

class MensajesDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super(schemaMensaje);
  }
}

module.exports = MensajesDaoMongoDb;
