const schemaMensaje = require("../../models/schemaMensaje");
const ContenedorMongoDb = require("../../contenedores/ContenedorMongoDb");

class MensajesDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super(schemaMensaje);
  }
}

module.exports = MensajesDaoMongoDb;
