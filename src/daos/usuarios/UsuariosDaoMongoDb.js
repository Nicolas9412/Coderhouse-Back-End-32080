const schemaUsuario = require("../../models/schemaUsuario");
const ContenedorMongoDb = require("../../contenedores/ContenedorMongoDb");

let instance = null;

class UsuariosDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super(schemaUsuario);
  }
  async getByEmail(username) {
    try {
      const user = await this.name.findOne({ username });
      return user;
    } catch (error) {
      console.error(error);
    }
  }
  static getInstance() {
    if (!instance) {
      instance = new UsuariosDaoMongoDb();
    }
    return instance;
  }
}

module.exports = UsuariosDaoMongoDb;
