const { DB_FIREBASE: db } = require("../../config");

class ContenedorFirebase {
  constructor(name) {
    this.name = name;
  }
  async save(obj) {
    try {
      const docRef = await db.collection(this.name).doc();
      const id = docRef.id;
      await docRef.set(obj);
      return id;
    } catch (error) {
      console.log(error);
    }
  }
  async getById(id) {
    try {
      const res = await db.collection(this.name).doc(id).get();
      if (res.data()) {
        const objFormateado = {
          id: res.id,
          ...res.data(),
        };
        return objFormateado;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getAll() {
    try {
      const res = await db.collection(coleccion).get();
      const objsFormateado = res.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return objsFormateado;
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
  async modify(id, replace) {
    try {
      await db.collection(this.name).doc(id).update(replace);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ContenedorFirebase;
