const ContenedorFirebase = require("../../Contenedores/ContenedorFirebase");
const { DB_FIREBASE: db } = require("../../../config");

class UsuariosDaoFirebase extends ContenedorFirebase {
  constructor() {
    super("usuarios");
  }
  async getByEmail(username) {
    try {
      let objFormateado;
      const userRef = db.collection(this.name);
      const querySnapshot = await userRef
        .where("username", "==", username)
        .get();

      querySnapshot.forEach(function (doc) {
        objFormateado = {
          _id: doc.id,
          ...doc.data(),
        };
      });

      return objFormateado;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UsuariosDaoFirebase;
