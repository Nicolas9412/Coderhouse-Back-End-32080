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
const initializeAuth = require("./src/config/auth");
const { connectMDB } = require("./config");

const options = { default: { port: 8080 } };
const args = parseArgs(process.argv.slice(2), options);
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const app = express();

connectMDB();

const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);
const PORT = args.port;

app.use(compression());

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      mongoOptions: advancedOptions,
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    rolling: true,
    saveUninitialized: true,
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

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initializeAuth(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", routerAuth);

app.set("view engine", "ejs");

httpServer.listen(process.env.PORT || PORT, () => {
  logger.info(
    `Servidor levantado http://localhost:${
      httpServer.address().port
    }/auth/login`
  );
});
httpServer.on("error", (error) =>
  loggerArchivoError.error(`Error en el servidor ${error}`)
);

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/auth/login");
  }
}

//app.get("/api/info/Bloq", routes.getInfoProcessBloq);
//app.get("/api/info/Nobloq", routes.getInfoProcessNoBloq);

//app.get("/api/randoms", checkAuthentication, routes.getRandoms);

app.get("/ruta-protegida", checkAuthentication, (req, res) => {
  const { username, password } = req.user;
  const user = { username, password };
  res.send("<h1>Ruta ok!</h1>");
});

//app.all("*", routes.failRoute);

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
