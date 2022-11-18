const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
require("dotenv").config();
const initializePassport = require("./src/config/auth");
const { connectMDB } = require("./config");
const upload = require("./src/config/multer");
const routerProductos = require("./src/routers/productos");
const routerCarrito = require("./src/routers/carrito");
const routerApp = require("./src/routers/app");
const routerAuth = require("./src/routers/auth");
const log4js = require("./logger");

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const app = express();

connectMDB();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logger
const logger = log4js.getLogger();
const loggerArchivoError = log4js.getLogger("archivoError");

// Multer
app.use(upload);

// Session
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

// Passport
initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", routerApp);
app.use("/auth", routerAuth);
app.use("/api/productos", routerProductos);
app.use("/api/carrito", routerCarrito);

app.all("*", (req, res) => {
  res.json({
    error: -2,
    descripcion: `ruta '${req.url}' método '${req.method}' no implementado`,
  });
});

const PORT = process.env.PORT || 8080;

if (process.env.MODO == "CLUSTER") {
  const cluster = require("cluster");
  const numCPUs = require("os").cpus().length;

  if (cluster.isMaster) {
    logger.info(`Master ${process.pid} is running`);
    // fork workers.
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
    cluster.on("exit", (worker, code, signal) => {
      cluster.fork();
      logger.info(`worker ${worker.process.pid} died`);
    });
  } else {
    const server = app.listen(PORT, () =>
      logger.info(`Worker ${process.pid} started`)
    );
    server.on("error", (error) =>
      loggerArchivoError.error(`Error en servidor ${error}`)
    );
  }
} else {
  /* Server Listen */
  const server = app.listen(PORT, () =>
    logger.info(`servidor Levantado http://localhost:${PORT}`)
  );
  server.on("error", (error) =>
    loggerArchivoError.error(`Error en servidor ${error}`)
  );
}
