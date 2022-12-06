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
          _id: res.id,
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
      const res = await db.collection(this.name).get();
      const objsFormateado = res.docs.map((doc) => ({
        _id: doc.id,
        ...doc.data(),
      }));
      return objsFormateado;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteById(id) {
    try {
      const result = await this.getById(id);
      await db.collection(this.name).doc(id).delete();
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  async modify(id, replace) {
    try {
      const result = await this.getById(id);
      await db.collection(this.name).doc(id).update(replace);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ContenedorFirebase;
