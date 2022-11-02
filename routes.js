const { fork } = require("child_process");
const log4js = require("./logger");

const productosBD = new Contenedor(knexMariaDB, "productos");
const chatBD = new Contenedor(knexSQLite3, "mensajes");

function getRoot(req, res) {
  res.render("index", {});
}

let productos = [];
let chat = [];

async function getLogin(req, res) {
  if (req.isAuthenticated()) {
    const { username, password } = req.user;
    const user = { username, password };
    if (!req.session["login"]) {
      req.session["login"] = {};
      req.session["login"].username = username;
    }
    productos = await productosBD.selectAll();
    chat = await chatBD.selectAll();
    res.render("pages/form-list-chat.ejs", { user, productos, chat });
  } else {
    res.render("pages/login.ejs");
  }
}

function getSignup(req, res) {
  if (req.isAuthenticated()) {
    const { username, password } = req.user;
    const user = { username, password };
    res.render("pages/form-list-chat.ejs", { user });
  } else {
    res.render("pages/register.ejs");
  }
}

function postLogin(req, res) {
  const { username, password } = req.user;
  const user = { username, password };
  res.render("pages/form-list-chat.ejs", { user });
}

function postSignup(req, res) {
  const { username, password } = req.user;
  const user = { username, password };
  res.render("pages/form-list-chat.ejs", { user });
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

function routesReceived(req, res) {
  const logger = log4js.getLogger();
  logger.info(`ruta '${req.url}' método '${req.method}'`);
  res.end();
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
  routesReceived,
};
