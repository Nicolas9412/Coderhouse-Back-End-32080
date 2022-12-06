const ContenedorMemoria = require("../../Contenedores/ContenedorMemoria");

let instance = null;

class MensajesDaoMemoria extends ContenedorMemoria {
  constructor() {
    super("mensajes");
  }
  static getInstance() {
    if (!instance) {
      instance = new MensajesDaoMemoria();
    }
    return instance;
  }
}

module.exports = MensajesDaoMemoria;
