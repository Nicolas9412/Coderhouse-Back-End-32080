const { productosDaos: Productos } = require("../daos/mainDaos");

const productosBD = new Productos();

async function getProducts() {
  const products = await productosBD.getAll();
  return products;
}

module.exports = {
  getProducts,
};
