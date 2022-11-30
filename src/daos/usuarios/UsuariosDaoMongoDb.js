const schemaUsuario = require("../../models/schemaUsuario");
const ContenedorMongoDb = require("../../contenedores/ContenedorMongoDb");

class UsuariosDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super(schemaUsuario);
  }
  async getByEmail(username) {
    try {
      await connectMDB();
      const user = await this.name.findOne({ username });
      disconnectMDB();
      return user;
    } catch (error) {
      loggerArchivoError.error(error);
    }
  }
}

module.exports = UsuariosDaoMongoDb;
