const UsuariosDaoArchivos = require("./UsuariosDaoArchivos");
const UsuariosDaoFirebase = require("./UsuariosDaoFirebase");
const UsuariosDaoMemoria = require("./UsuariosDaoMemoria");
const UsuariosDaoMongoDb = require("./UsuariosDaoMongoDb");

class UsuariosFactoryDAO {
  static get(tipo) {
    switch (tipo) {
      case "MEM":
        return UsuariosDaoMemoria.getInstance();
      case "FILE":
        return UsuariosDaoArchivos.getInstance();
      case "MONGO":
        return UsuariosDaoMongoDb.getInstance();
      case "FIREBASE":
        return UsuariosDaoFirebase.getInstance();
      default:
        return UsuariosDaoMemoria.getInstance();
    }
  }
}
module.exports = UsuariosFactoryDAO;
