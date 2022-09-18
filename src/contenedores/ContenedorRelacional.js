class ContenedorRelacional {
  constructor(knex, tabla) {
    this.knex = knex;
    this.tabla = tabla;
  }
  async save(obj) {
    await this.knex(this.tabla)
      .insert(obj)
      .then(() => console.log("data inserted"))
      .catch((e) => {
        console.log(e);
        throw e;
      });
  }
  async modify(id, obj) {
    await this.knex(this.tabla)
      .where("id", id)
      .update(obj)
      .then(() => console.log("data updated"))
      .catch((e) => {
        console.log(e);
        throw e;
      });
  }
  async deleteById(id) {
    await this.knex(this.tabla)
      .where("id", id)
      .del()
      .then(() => console.log("data deleted"))
      .catch((e) => {
        console.log(e);
        throw e;
      });
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
    return result;
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
