const mongoose = require("mongoose");
const ProductoSchema = require("./modelsMDB/schemaProducto");

class Producto {
  async connectMDB() {
    try {
      const URL =
        "mongodb+srv://Nicolas9412:admin123@cluster0.x4k71fz.mongodb.net/ecommerce?retryWrites=true&w=majority";
      let rta = await mongoose.connect(URL, {
        useNewUrlParser: true,
        useUniFiedTopology: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async save(prod) {
    try {
      await this.connectMDB();
      const productoNuevo = new ProductoSchema({ ...prod });
      await productoNuevo.save();
      mongoose.disconnect();
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      await this.connectMDB();
      const productoEncontrado = await ProductoSchema.findById(id);
      mongoose.disconnect();
      return productoEncontrado;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      await this.connectMDB();
      const productosEncontrados = await ProductoSchema.find();
      mongoose.disconnect();
      return productosEncontrados;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    try {
      await this.connectMDB();
      await ProductoSchema.findByIdAndDelete(id);
      mongoose.disconnect();
    } catch (error) {
      console.log(error);
    }
  }

  async modifyProduct(id, prod) {
    try {
      await this.connectMDB();
      const productoModificado = await ProductoSchema.findByIdAndUpdate(id, {
        $set: { ...prod },
      });
      mongoose.disconnect();
      return productoModificado;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Producto;
