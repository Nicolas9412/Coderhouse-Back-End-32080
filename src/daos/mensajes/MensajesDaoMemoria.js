const ContenedorMemoria = require("../../Contenedores/ContenedorMemoria");

class MensajesDaoMemoria extends ContenedorMemoria {
  constructor() {
    super("mensajes");
  }
}

module.exports = MensajesDaoMemoria;
