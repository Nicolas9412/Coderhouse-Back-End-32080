class ContenedorMemoria {
  constructor(name) {
    this.name = name;
  }
  save(obj) {
    this.name.push(obj);
  }
  getById(id) {
    this.name.find((item) => item.id == id);
  }
  getAll() {
    return this.name;
  }
  deleteById(id) {
    this.name.filter((item) => item.id != id);
  }
  modify(id, replace) {
    const prev = this.getById(id);
    const objReplace = { ...prev, ...replace };
    this.deleteById(id);
    this.save(objReplace);
  }
}

module.export = ContenedorMemoria;
