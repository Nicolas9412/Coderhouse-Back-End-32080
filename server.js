const express = require("express");
const compression = require("compression");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
require("dotenv").config();
const parseArgs = require("minimist");
const log4js = require("./logger");
const logger = log4js.getLogger();
const loggerArchivoError = log4js.getLogger("archivoError");

const options = { default: { port: 8080 } };
const args = parseArgs(process.argv.slice(2), options);

const Usuarios = require("./models/usuarios");

const bcrypt = require("bcrypt");
const routes = require("./routes");
const mongoose = require("mongoose");

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const app = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);
app.use(compression());
const PORT = args.port;

function isValidPassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}

function createHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

mongoose
  .connect(process.env.CONNECTION_MONGO_ATLAS)
  .then(() => logger.info("Connected to DB"))
  .catch((e) => {
    loggerArchivoError.error(e);
    throw "can not connect to the db";
  });

passport.use(
  "login",
  new LocalStrategy((username, password, done) => {
    Usuarios.findOne({ username }, (err, user) => {
      if (err) return done(err);

      if (!user) {
        logger.info("User Not Found with username " + username);
        return done(null, false);
      }

      if (!isValidPassword(user, password)) {
        logger.info("Invalid Password");
        return done(null, false);
      }

      return done(null, user);
    });
  })
);

passport.use(
  "signup",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      Usuarios.findOne({ username: username }, function (err, user) {
        if (err) {
          loggerArchivoError.error("Error in SignUp: " + err);
          return done(err);
        }

        if (user) {
          logger.info("User already exists");
          return done(null, false);
        }

        const newUser = {
          username: username,
          password: createHash(password),
        };
        Usuarios.create(newUser, (err, userWithId) => {
          if (err) {
            loggerArchivoError.error("Error in Saving user: " + err);
            return done(err);
          }
          logger.info(user);
          logger.info("User Registration succesful");
          return done(null, userWithId);
        });
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  Usuarios.findById(id, done);
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

app.use(passport.initialize());
app.use(passport.session());

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

app.get("/", routes.getRoot);
app.get("/login", routes.getLogin);
app.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  routes.postLogin
);
app.get("/faillogin", routes.getFaillogin);
app.get("/signup", routes.getSignup);
app.post(
  "/signup",
  passport.authenticate("signup", { failureRedirect: "/failsignup" }),
  routes.postSignup
);
app.get("/failsignup", routes.getFailsignup);
app.get("/logout", routes.getLogout);

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
}

app.get("/infoBloq", routes.getInfoProcessBloq);
app.get("/infoNobloq", routes.getInfoProcessNoBloq);

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
