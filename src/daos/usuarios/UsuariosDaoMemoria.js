const ContenedorMemoria = require("../../Contenedores/ContenedorMemoria");

class UsuariosDaoMemoria extends ContenedorMemoria {
  constructor() {
    super("usuarios");
  }
  async getByEmail(username) {
    try {
      const index = this.memoria.findIndex((user) => user.username == username);
      return this.memoria[index];
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = UsuariosDaoMemoria;
