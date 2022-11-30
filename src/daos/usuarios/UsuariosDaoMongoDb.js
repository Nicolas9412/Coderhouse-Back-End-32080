const schemaUsuario = require("../../models/schemaUsuario");
const ContenedorMongoDb = require("../../contenedores/ContenedorMongoDb");

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
}

module.exports = UsuariosDaoMongoDb;
