const ContenedorFirebase = require("../../Contenedores/ContenedorFirebase");

let instance = null;

class MensajesDaoFirebase extends ContenedorFirebase {
  constructor() {
    super("mensajes");
  }
  static getInstance() {
    if (!instance) {
      instance = new MensajesDaoFirebase();
    }
    return instance;
  }
}

module.exports = MensajesDaoFirebase;
