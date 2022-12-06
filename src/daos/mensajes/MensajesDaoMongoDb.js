const schemaMensaje = require("../../models/schemaMensaje");
const ContenedorMongoDb = require("../../Contenedores/ContenedorMongoDb");

let instance = null;

class MensajesDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super(schemaMensaje);
  }
  static getInstance() {
    if (!instance) {
      instance = new MensajesDaoMongoDb();
    }
    return instance;
  }
}

module.exports = MensajesDaoMongoDb;
