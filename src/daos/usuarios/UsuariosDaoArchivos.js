const ContenedorArchivos = require("../../Contenedores/ContenedorArchivos");
const fs = require("fs");

let instance = null;

class UsuariosDaoArchivos extends ContenedorArchivos {
  constructor() {
    super("./db/usuarios.json");
  }
  async getByEmail(username) {
    try {
      let usuarioCapturado;
      let usuarios = await fs.promises.readFile(this.name, "utf-8");
      usuarios = JSON.parse(usuarios);
      usuarios.forEach((user) => {
        if (user.username == username) {
          usuarioCapturado = user;
        }
      });
      console.log("usuario capturado", usuarioCapturado);
      return usuarioCapturado || null;
    } catch (error) {
      console.log("Algo salió mal!");
    }
  }
  static getInstance() {
    if (!instance) {
      instance = new UsuariosDaoArchivos();
    }
    return instance;
  }
}

module.exports = UsuariosDaoArchivos;
