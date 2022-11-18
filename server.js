const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const dotenv = require("dotenv");
const initializePassport = require("./src/config/auth");
const { connectMDB } = require("./config");
const upload = require("./src/config/multer");
const routerProductos = require("./src/routers/productos");
const routerCarrito = require("./src/routers/carrito");
const routerApp = require("./src/routers/app");
const routerAuth = require("./src/routers/auth");

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const app = express();

connectMDB();

dotenv.config();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");

// Multer
app.use(upload);

app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://Nicolas9412:admin123@cluster0.x4k71fz.mongodb.net/ecommerce?retryWrites=true&w=majority",
      mongoOptions: advancedOptions,
    }),
    secret: "top secret",
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

/* Server Listen */
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () =>
  console.log(`servidor Levantado http://localhost:${PORT}`)
);
server.on("error", (error) => console.log(`Error en servidor ${error}`));
