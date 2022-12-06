const ContenedorMemoria = require("../../Contenedores/ContenedorMemoria");

let instance = null;

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
  static getInstance() {
    if (!instance) {
      instance = new UsuariosDaoMemoria();
    }
    return instance;
  }
}

module.exports = UsuariosDaoMemoria;
