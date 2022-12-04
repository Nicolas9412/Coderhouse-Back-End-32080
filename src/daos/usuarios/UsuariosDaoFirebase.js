const ContenedorFirebase = require("../../Contenedores/ContenedorFirebase");

class UsuariosDaoFirebase extends ContenedorFirebase {
  constructor() {
    super("usuarios");
  }
}

module.exports = UsuariosDaoFirebase;
