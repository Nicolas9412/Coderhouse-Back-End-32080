class ContenedorMemoria {
  constructor(name) {
    this.name = name;
    this.memoria = [];
    this._id = 0;
  }

  save(obj) {
    this._id = this._id + 1;
    this.memoria.push({ ...obj, _id: this._id });
    return this._id;
  }
  getById(id) {
    const index = this.memoria.findIndex((item) => item._id == id);
    return this.memoria[index];
  }
  getAll() {
    return this.memoria;
  }
  deleteById(id) {
    const res = this.memoria.filter((item) => item._id != id);
    if (!this.getById(id)) return;
    return (this.memoria = [...res]);
  }
  modify(id, replace) {
    const index = this.memoria.findIndex((item) => item._id == id);
    if (!this.getById(id)) return;
    return (this.memoria[index] = { ...this.memoria[index], ...replace });
  }
}

module.exports = ContenedorMemoria;
