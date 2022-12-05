const MensajesDaoArchivos = require("./MensajesDaoArchivos");
const MensajesDaoFirebase = require("./MensajesDaoFirebase");
const MensajesDaoMemoria = require("./MensajesDaoMemoria");
const MensajesDaoMongoDb = require("./MensajesDaoMongoDb");

class MensajesFactoryDAO {
  static get(tipo) {
    switch (tipo) {
      case "MEM":
        return new MensajesDaoMemoria();
      case "FILE":
        return new MensajesDaoArchivos();
      case "MONGO":
        return new MensajesDaoMongoDb();
      case "FIREBASE":
        return new MensajesDaoFirebase();
      default:
        return new MensajesDaoMemoria();
    }
  }
}
module.exports = MensajesFactoryDAO;
