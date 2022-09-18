const admin = require("firebase-admin");

const serviceAccount = require("./db/segunda-entrega-proyecto-final-firebase-adminsdk-172da-d1b8a77230.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

class Carrito {
  constructor(name) {
    this.name = name;
  }
  async save(cart) {
    try {
      const docRef = await db.collection(this.name).doc();
      const id = docRef.id;
      await docRef.set(cart);
      return id;
    } catch (error) {
      console.log(error);
    }
  }
  async getById(id) {
    try {
      const res = await db.collection(this.name).doc(id).get();
      if (res.data()) {
        const carritoFormateado = {
          id: res.id,
          ...res.data(),
        };
        return carritoFormateado;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getAll() {
    try {
      const res = await db.collection(coleccion).get();
      const carritosFormateado = res.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return carritosFormateado;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteById(id) {
    try {
      await db.collection(this.name).doc(id).delete();
    } catch (error) {
      console.log(error);
    }
  }
  async modifyProduct(id, cart) {
    try {
      await db.collection(this.name).doc(id).update(cart);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Carrito;
