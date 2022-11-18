const ContenedorMongoDb = require("../../contenedores/ContenedorMongoDb");
const schemaUsuario = require("../../modelsMDB/schemaUsuario");
const { connectMDB, disconnectMDB } = require("../../../config");

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
    } catch (err) {
      console.log(err);
    }
  }

  async addCart(userId, cartId) {
    try {
      await connectMDB();
      const user = await this.name.findOneAndUpdate(
        { _id: userId },
        { cart_id: cartId }
      );
      disconnectMDB();
      return cartId;
    } catch (err) {
      console.log(err);
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
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = UsuariosDaoMongoDb;
