const ContenedorArchivos = require("../../Contenedores/ContenedorArchivos");

class MensajesDaoArchivo extends ContenedorArchivos {
  constructor() {
    super("./db/mensajes.json");
  }
}

module.exports = MensajesDaoArchivo;
