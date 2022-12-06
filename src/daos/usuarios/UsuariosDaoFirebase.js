const ContenedorFirebase = require("../../Contenedores/ContenedorFirebase");
const { DB_FIREBASE: db } = require("../../../config");

let instance = null;

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
  static getInstance() {
    if (!instance) {
      instance = new UsuariosDaoFirebase();
    }
    return instance;
  }
}

module.exports = UsuariosDaoFirebase;
