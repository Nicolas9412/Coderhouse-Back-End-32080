class ContenedorMemoria {
  constructor(name) {
    this.name = name;
    this.memoria = [];
    this.id = 0;
  }

  save(obj) {
    this.id = this.id + 1;
    this.memoria.push({ ...obj, id: this.id });
    return this.id;
  }
  getById(id) {
    const index = this.memoria.findIndex((item) => item.id == id);
    console.log(`${this.name} ${this.memoria[index]}`);
    return this.memoria[index];
  }
  getAll() {
    this.memoria.map((item) => console.log(item));
    return this.memoria;
  }
  deleteById(id) {
    const res = this.memoria.filter((item) => item.id != id);
    this.memoria = [...res];
  }
  modify(id, replace) {
    const index = this.memoria.findIndex((item) => item.id == id);
    this.memoria[index] = { ...this.memoria[index], ...replace };
  }
}

module.exports = ContenedorMemoria;
