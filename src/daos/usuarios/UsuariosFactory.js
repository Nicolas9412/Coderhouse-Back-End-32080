const UsuariosDaoArchivos = require("./UsuariosDaoArchivos");
const UsuariosDaoFirebase = require("./UsuariosDaoFirebase");
const UsuariosDaoMemoria = require("./UsuariosDaoMemoria");
const UsuariosDaoMongoDb = require("./UsuariosDaoMongoDb");

class UsuariosFactoryDAO {
  static get(tipo) {
    switch (tipo) {
      case "MEM":
        return new UsuariosDaoMemoria();
      case "FILE":
        return new UsuariosDaoArchivos();
      case "MONGO":
        return new UsuariosDaoMongoDb();
      case "FIREBASE":
        return new UsuariosDaoFirebase();
      default:
        return new UsuariosDaoMemoria();
    }
  }
}
module.exports = UsuariosFactoryDAO;
