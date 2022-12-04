const ContenedorArchivos = require("../../Contenedores/ContenedorArchivos");

class MensajesDaoArchivos extends ContenedorArchivos {
  constructor() {
    super("./db/mensajes.json");
  }
}

module.exports = MensajesDaoArchivos;
