const ProductoRepo = require("../repositories/products");

const productosBD1 = ProductoRepo.getInstance();
const productosBD2 = ProductoRepo.getInstance();

console.log("Equals BDProd 1 and BDProd 2: ", productosBD1 == productosBD2);

async function getProducts() {
  const products = await productosBD1.getAll();
  return products;
}

module.exports = {
  getProducts,
};
