class ContainerMongoDb {
  constructor(name) {
    this.name = name;
  }

  async save(obj) {
    try {
      const objNuevo = new this.name({ ...obj });
      const objCreado = await objNuevo.save();
      return objCreado._id;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const objEncontrado = await this.name.findById(id);
      return objEncontrado;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      const objEncontrados = await this.name.find();

      return objEncontrados;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    try {
      const objEncontrado = await this.name.findById(id);
      await this.name.findByIdAndDelete(id);
      return objEncontrado;
    } catch (error) {
      console.log(error);
    }
  }

  async modify(id, replace) {
    try {
      const objModificado = await this.name.findByIdAndUpdate(id, {
        $set: { ...replace },
      });
      return objModificado;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ContainerMongoDb;
