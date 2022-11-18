const log4js = require("../../../logger");
const ContenedorMongoDb = require("../../contenedores/ContenedorMongoDb");
const schemaUsuario = require("../../modelsMDB/schemaUsuario");
const { connectMDB, disconnectMDB } = require("../../../config");

//Logger
const loggerArchivoError = log4js.getLogger("archivoError");

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

  async addCart(userId, cartId) {
    try {
      await connectMDB();
      await this.name.findOneAndUpdate({ _id: userId }, { cart_id: cartId });
      disconnectMDB();
      return cartId;
    } catch (error) {
      loggerArchivoError.error(error);
    }
  }

  async deleteCart(id) {
    try {
      await connectMDB();
      const user = this.name.findOneAndUpdate(
        { cart_id: id },
        { $unset: { cart_id: 1 } }
      );
      return user;
    } catch (error) {
      loggerArchivoError.error(error);
    }
  }
}

module.exports = UsuariosDaoMongoDb;
