const ContenedorArchivos = require("../../Contenedores/ContenedorArchivos");

let instance = null;

class MensajesDaoArchivos extends ContenedorArchivos {
  constructor() {
    super("./db/mensajes.json");
  }
  static getInstance() {
    if (!instance) {
      instance = new MensajesDaoArchivos();
    }
    return instance;
  }
}

module.exports = MensajesDaoArchivos;
