const { getProducts } = require("../servicies/products");
const { getChat } = require("../servicies/chat");

async function getLogin(req, res) {
  if (req.isAuthenticated()) {
    const { username, password } = req.user;
    const user = { username, password };
    if (!req.session["login"]) {
      req.session["login"] = {};
      req.session["login"].username = username;
    }
    const productos = await getProducts();
    const chat = await getChat();
    res.render("pages/form-list-chat.ejs", { user, productos, chat });
  } else {
    res.render("pages/login.ejs");
  }
}

async function getSignup(req, res) {
  if (req.isAuthenticated()) {
    const { username, password } = req.user;
    const user = { username, password };
    const productos = await productosBD.getAll();
    const chat = await chatBD.getAll();
    res.render("pages/form-list-chat.ejs", { user, productos, chat });
  } else {
    res.render("pages/register.ejs");
  }
}

async function postLogin(req, res) {
  const { username, password } = req.user;
  const user = { username, password };
  const productos = await productosBD.getAll();
  const chat = await chatBD.getAll();
  res.render("pages/form-list-chat.ejs", { user, productos, chat });
}

async function postSignup(req, res) {
  const { username, password } = req.user;
  const user = { username, password };
  const productos = await productosBD.getAll();
  const chat = await chatBD.getAll();
  res.render("pages/form-list-chat.ejs", { user, productos, chat });
}

function getFaillogin(req, res) {
  res.render("pages/login-error", {});
}

function getFailsignup(req, res) {
  res.render("pages/signup-error", {});
}

function getLogout(req, res) {
  if (req.isAuthenticated()) {
    const { username } = req.user;
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

module.exports = {
  getLogin,
  getSignup,
  postLogin,
  postSignup,
  getFaillogin,
  getFailsignup,
  getLogout,
};
