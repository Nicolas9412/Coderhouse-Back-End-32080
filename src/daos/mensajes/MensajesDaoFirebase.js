const ContenedorFirebase = require("../../Contenedores/ContenedorFirebase");

class MensajesDaoFirebase extends ContenedorFirebase {
  constructor() {
    super("mensajes");
  }
}

module.exports = MensajesDaoFirebase;
