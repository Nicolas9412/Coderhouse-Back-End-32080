class ContenedorRelacional {
  constructor(knex, tabla) {
    this.knex = knex;
    this.tabla = tabla;
  }
  async save(obj) {
    let result;
    await this.knex(this.tabla)
      .returning("id")
      .insert(obj)
      .then((res) => {
        result = res;
        console.log("data inserted");
      })
      .catch((e) => {
        console.log(e);
        throw e;
      });
    return result[0];
  }
  async modify(id, obj) {
    if (await this.getById(id)) {
      await this.knex(this.tabla)
        .where("id", id)
        .update(obj)
        .then(() => console.log("data updated"))
        .catch((e) => {
          console.log(e);
          throw e;
        });
      return 1;
    } else {
      return null;
    }
  }
  async deleteById(id) {
    if (await this.getById(id)) {
      await this.knex(this.tabla)
        .where("id", id)
        .del()
        .then(() => console.log("data deleted"))
        .catch((e) => {
          console.log(e);
          throw e;
        });
      return 1;
    } else {
      return null;
    }
  }
  async getAll() {
    let result = [];
    await this.knex(this.tabla)
      .select("*")
      .then((res) => (result = [...res]))
      .catch((e) => {
        console.log(e);
        throw e;
      });
    return result;
  }
  async getById(id) {
    let result;
    await this.knex
      .from(this.tabla)
      .select("*")
      .where("id", id)
      .then((res) => (result = res))
      .catch((e) => {
        console.log(e);
        throw e;
      });
    return result.length != 0 ? result : null;
  }
  async getByProp(prop, value) {
    let result;
    await this.knex
      .from(this.tabla)
      .select("*")
      .where(`${prop}`, value)
      .then((res) => (result = res))
      .catch((e) => {
        console.log(e);
        throw e;
      });
    return result;
  }
}

module.exports = ContenedorRelacional;
