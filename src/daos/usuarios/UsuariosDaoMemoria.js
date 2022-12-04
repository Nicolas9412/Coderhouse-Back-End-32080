const ContenedorMemoria = require("../../Contenedores/ContenedorMemoria");

class UsuariosDaoMemoria extends ContenedorMemoria {
  constructor() {
    super("usuarios");
  }
}

module.exports = UsuariosDaoMemoria;
