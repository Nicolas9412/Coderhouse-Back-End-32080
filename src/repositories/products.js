const parseArgs = require("minimist");
const args = parseArgs(process.argv.slice(2));
const ProductosFactoryDAO = require("../daos/productos/ProductosFactory");
const Producto = require("./classes/Product");

let instance = null;

class ProductoRepo {
  constructor() {
    this.dao = ProductosFactoryDAO.get(args.p || process.env.TYPE_PERSIST);
  }
  static getInstance() {
    if (!instance) {
      instance = new ProductoRepo();
    }
    return instance;
  }
  async save(obj) {
    const dto = new Producto(obj);
    return this.dao.save(dto);
  }
  async getById(id) {
    const dto = await this.dao.getById();
    return new Producto(dto);
  }
  async getAll() {
    const dtos = await this.dao.getAll();
    return dtos.map((dto) => new Producto(dto));
  }
  async deleteById(id) {
    return await this.dao.deleteById(id);
  }
  async modify(id, replace) {
    const dto = await this.dao.modify(id, replace);
    return new Producto(dto);
  }
}

module.exports = ProductoRepo;
