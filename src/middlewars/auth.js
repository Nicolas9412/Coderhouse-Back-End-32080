const { getHome } = require("../controllers/appController");

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.redirect("/auth/login");
};

const isNotAuthenticated = async (req, res, next) => {
  if (!req.isAuthenticated()) return next();
  return res.redirect("/home");
};

const admin = true;

const isAdmin = (req, res, next) => {
  if (admin) next();
  else
    return res.json({
      error: -1,
      descripcion: `Ruta ${req.url} método ${req.method} no autorizada`,
    });
};

module.exports = isAdmin;

module.exports = { isAuthenticated, isNotAuthenticated, isAdmin };
