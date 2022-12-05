//const { productosDaos: Productos } = require("../daos/mainDaos");
const ProductosFactoryDAO = require("../daos/productos/ProductosFactory");

const productosBD = ProductosFactoryDAO.get(process.env.TYPE_PERSIST);

async function getProducts() {
  const products = await productosBD.getAll();
  return products;
}

module.exports = {
  getProducts,
};
