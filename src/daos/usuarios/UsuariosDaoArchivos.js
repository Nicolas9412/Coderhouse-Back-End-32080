const ContenedorArchivos = require("../../Contenedores/ContenedorArchivos");

class UsuariosDaoArchivo extends ContenedorArchivos {
  constructor() {
    super("./db/usuarios.json");
  }
}

module.exports = UsuariosDaoArchivo;
