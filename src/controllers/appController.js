const log4js = require("../../logger");
const {
  productosDaos: Producto,
  carritoDaos: Carrito,
  usuariosDaos: Usuario,
} = require("../daos/mainDaos");

//Logger
const loggerArchivoError = log4js.getLogger("archivoError");

const productosBD = new Producto();
const carritosBD = new Carrito();
const usuariosBD = new Usuario();

function getRoot(req, res) {
  res.render("pages/index.ejs");
}

const getHome = async (req, res) => {
  let user = await usuariosBD.getById(req.user);
  if (!user.cart_id) {
    const response = await carritosBD.save(user._id);
    await usuariosBD.addCart(user._id, response._id);
    user = { ...user._doc, cart_id: response };
  }
  const products = await productosBD.getAll();
  const productsParsed = products.map((product) => ({
    ...product._doc,
  }));
  console.log(user);
  res.render("pages/home.ejs", { user, products: productsParsed });
};

function getPerfil(req, res) {
  if (req.isAuthenticated()) {
    const { _doc } = req.user;
    const user = { ..._doc };
    res.render("pages/perfil.ejs", { user });
  } else {
    res.render("pages/register.ejs");
  }
}

async function getCart(req, res) {
  try {
    const user = await usuariosBD.getById(req.user);

    const response = await carritosBD.getById(user.cart_id);
    const allProducts = [...response.productos];

    return res.render("pages/cart.ejs", {
      user,
      cart: { allProducts, cart_id: response._id },
    });
  } catch (error) {
    loggerArchivoError.error(error);
  }
}

module.exports = {
  getRoot,
  getHome,
  getPerfil,
  getCart,
};
