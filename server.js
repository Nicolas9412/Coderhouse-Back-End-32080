const express = require("express");
const compression = require("compression");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
require("dotenv").config();
const parseArgs = require("minimist");
const log4js = require("./logger");
const logger = log4js.getLogger();
const loggerArchivoError = log4js.getLogger("archivoError");
const routerAuth = require("./src/routes/auth");
const { initAuth } = require("./src/middlewares/mainMiddlewares");

const options = { default: { port: 8080 } };
const args = parseArgs(process.argv.slice(2), options);

const routes = require("./routes");
const mongoose = require("mongoose");

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const app = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);
app.use(compression());
const PORT = args.port;

mongoose
  .connect(process.env.CONNECTION_MONGO_ATLAS)
  .then(() => logger.info("Connected to DB"))
  .catch((e) => {
    loggerArchivoError.error(e);
    throw "can not connect to the db";
  });

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.CONNECTION_MONGO_ATLAS,
      mongoOptions: advancedOptions,
    }),
    secret: "top secret",
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: { maxAge: 600000, httpOnly: false, secure: false },
  })
);

app.use(function (req, res, next) {
  req.session._garbage = Date();
  req.session.touch();
  return next();
});

app.use((req, res, next) => {
  logger.info(`ruta '${req.url}' método '${req.method}'`);
  next();
});

initAuth(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", routerAuth);

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

httpServer.listen(process.env.PORT || PORT, () => {
  logger.info(
    `Servidor levantado http://localhost:${httpServer.address().port}/login`
  );
});
httpServer.on("error", (error) =>
  loggerArchivoError.error(`Error en el servidor ${error}`)
);

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
}

app.get("/api/info/Bloq", routes.getInfoProcessBloq);
app.get("/api/info/Nobloq", routes.getInfoProcessNoBloq);

app.get("/api/randoms", checkAuthentication, routes.getRandoms);

app.get("/ruta-protegida", checkAuthentication, (req, res) => {
  const { username, password } = req.user;
  const user = { username, password };
  res.send("<h1>Ruta ok!</h1>");
});

app.all("*", routes.failRoute);

const { mensajesDaos: Mensajes } = require("./src/daos/mainDaos");
const { productosDaos: Productos } = require("./src/daos/mainDaos");

const chatBD = new Mensajes();
const productosBD = new Productos();

io.on("connection", (socket) => {
  logger.info(`Usuario Conectado ${socket.id}`);
  socket.on("producto", async (data) => {
    await productosBD.save(data);
    productos = await productosBD.getAll();
    io.sockets.emit("producto-row", data);
  });
  socket.on("mensaje", async (data) => {
    await chatBD.save(data);
    chat = await chatBD.getAll();
    io.sockets.emit("chat", chat);
  });
});
