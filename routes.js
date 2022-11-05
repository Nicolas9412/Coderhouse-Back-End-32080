const { fork } = require("child_process");
const log4js = require("./logger");

const { mensajesDaos: Mensajes } = require("./src/daos/mainDaos");
const { productosDaos: Productos } = require("./src/daos/mainDaos");

const chatBD = new Mensajes();
const productosBD = new Productos();

function getRoot(req, res) {
  res.render("index", {});
}

async function getLogin(req, res) {
  if (req.isAuthenticated()) {
    const { username, password } = req.user;
    const user = { username, password };
    if (!req.session["login"]) {
      req.session["login"] = {};
      req.session["login"].username = username;
    }
    const productos = await productosBD.getAll();
    const chat = await chatBD.getAll();
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

function failRoute(req, res) {
  const loggerArchivoWarn = log4js.getLogger("archivoWarn");
  loggerArchivoWarn.warn(
    `ruta '${req.url}' método '${req.method}' no implementado`
  );
  res.status(404).json({
    error: -2,
    descripcion: `ruta '${req.url}' método '${req.method}' no implementado`,
  });
}

function getInfoProcess(req, res) {
  info = {
    args: process.argv,
    cwd: process.cwd(),
    pid: process.pid,
    version: process.version,
    title: process.title,
    os: process.platform,
    memoryUsage: process.memoryUsage().rss,
  };
  res.render("pages/infoProcess.ejs", { info });
}

function generateRandomInt(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

function getRandoms(req, res) {
  const { cant = 100000000 } = req.query;
  const computo = fork("./computo.js");
  computo.send(cant);
  computo.on("message", (result) => {
    res.render("pages/infoRandoms.ejs", {
      numbers: Object.keys(result),
      values: Object.values(result),
    });
  });
  res.render("pages/infoRandoms.ejs", {
    numbers: Object.keys(result),
    values: Object.values(result),
  });
}

module.exports = {
  getRoot,
  getLogin,
  getSignup,
  postLogin,
  postSignup,
  getFaillogin,
  getFailsignup,
  getLogout,
  failRoute,
  getInfoProcess,
  getRandoms,
};
