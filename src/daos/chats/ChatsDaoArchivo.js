const ContenedorArchivo = require("../../contenedores/ContenedorArchivo");

class ChatsDaoArchivo extends ContenedorArchivo {
  constructor() {
    super("chats.json");
  }
}

module.exports = { ChatsDaoArchivo };
