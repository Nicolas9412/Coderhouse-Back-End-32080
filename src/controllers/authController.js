const getRoot = (req, res) => {
  res.render("pages/index.ejs");
};

function getLogin(req, res) {
  if (req.isAuthenticated()) {
    const { _doc } = req.user;
    const user = { ..._doc };
    const { username } = user;
    if (!req.session["login"]) {
      req.session["login"] = {};
      req.session["login"].username = username;
    }
    res.render("pages/home.ejs", { user });
  } else {
    res.render("pages/login.ejs");
  }
}

function getSignup(req, res) {
  if (req.isAuthenticated()) {
    const { _doc } = req.user;
    const user = { ..._doc };
    res.render("pages/home.ejs", { user });
  } else {
    res.render("pages/register.ejs");
  }
}

function postLogin(req, res) {
  const { _doc } = req.user;
  const user = { ..._doc };
  res.redirect("/home");
}

async function postSignup(req, res) {
  const { usuariosDaos: Usuario } = require("../daos/mainDaos");
  const usuariosBD = new Usuario();
  const user = await usuariosBD.getById(req.user);
  res.redirect("/home");
}

function getFailLogin(req, res) {
  res.render("pages/login-error", {});
}

function getFailSignup(req, res) {
  res.render("pages/signup-error", {});
}

function getLogout(req, res) {
  if (req.isAuthenticated()) {
    const { _doc } = req.user;
    const user = { ..._doc };
    const { username } = user;
    req.logout(() => {
      req.session.destroy((err) => {
        if (err) {
          return res.json({ status: "Logout ERROR", body: err });
        }
        res.render("pages/logout.ejs", { username });
      });
    });
  }
}

function failRoute(req, res) {
  res.status(404).render("pages/routing-error", {});
}

module.exports = {
  getRoot,
  getLogin,
  getSignup,
  postLogin,
  postSignup,
  getFailLogin,
  getFailSignup,
  getLogout,
  failRoute,
};
