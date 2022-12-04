const ContenedorArchivos = require("../../Contenedores/ContenedorArchivos");

class UsuariosDaoArchivos extends ContenedorArchivos {
  constructor() {
    super("./db/usuarios.json");
  }
}

module.exports = UsuariosDaoArchivos;
