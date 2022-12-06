const MensajesDaoArchivos = require("./MensajesDaoArchivos");
const MensajesDaoFirebase = require("./MensajesDaoFirebase");
const MensajesDaoMemoria = require("./MensajesDaoMemoria");
const MensajesDaoMongoDb = require("./MensajesDaoMongoDb");

class MensajesFactoryDAO {
  static get(tipo) {
    switch (tipo) {
      case "MEM":
        return MensajesDaoMemoria.getInstance();
      case "FILE":
        return MensajesDaoArchivos.getInstance();
      case "MONGO":
        return MensajesDaoMongoDb.getInstance();
      case "FIREBASE":
        return MensajesDaoFirebase.getInstance();
      default:
        return MensajesDaoMemoria.getInstance();
    }
  }
}
module.exports = MensajesFactoryDAO;
