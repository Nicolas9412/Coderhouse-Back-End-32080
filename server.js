const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const Usuarios = require("./models/usuarios");

const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const app = express();
const PORT = 8080;

function isValidPassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}

function createHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

mongoose
  .connect(
    "mongodb+srv://Nicolas9412:admin123@cluster0.x4k71fz.mongodb.net/ecommerce?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to DB"))
  .catch((e) => {
    console.error(e);
    throw "can not connect to the db";
  });

passport.use(
  "login",
  new LocalStrategy((username, password, done) => {
    Usuarios.findOne({ username }, (err, user) => {
      if (err) return done(err);

      if (!user) {
        console.log("User Not Found with username " + username);
        return done(null, false);
      }

      if (!isValidPassword(user, password)) {
        console.log("Invalid Password");
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
          console.log("Error in SignUp: " + err);
          return done(err);
        }

        if (user) {
          console.log("User already exists");
          return done(null, false);
        }

        const newUser = {
          username: username,
          password: createHash(password),
        };
        Usuarios.create(newUser, (err, userWithId) => {
          if (err) {
            console.log("Error in Saving user: " + err);
            return done(err);
          }
          console.log(user);
          console.log("User Registration succesful");
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
      mongoUrl:
        "mongodb+srv://Nicolas9412:admin123@cluster0.x4k71fz.mongodb.net/ecommerce?retryWrites=true&w=majority",
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
  console.log(req.session);
  req.session._garbage = Date();
  req.session.touch();
  return next();
});

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

const server = app.listen(PORT, () => {
  console.log(
    `Servidor levantado http://localhost:${server.address().port}/login`
  );
});
server.on("error", (error) => {
  console.log(`Error en el servidor ${error}`);
});

let usuario = "";

function checkLogin(req, res, next) {
  if (!req.session["login"]) {
    return res.render("pages/login.ejs");
  }
  return next();
}

app.get("/register", (req, res) => {
  return res.render("pages/register.ejs");
});

app.get("/login", checkLogin, (req, res) => {
  usuario = req.session["login"].usuario;
  return res.render("pages/vistaProductos.ejs", { usuario });
});

app.post("/login", (req, res) => {
  const { body } = req;
  usuario = body.usuario;
  if (!req.session["login"]) {
    req.session["login"] = {};
    req.session["login"].usuario = usuario;
  }
  res.render("pages/vistaProductos.ejs", { usuario });
});

app.get("/logout", checkLogin, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.json({ status: "Logout ERROR", body: err });
    }
    res.render("pages/logout.ejs", { usuario });
  });
});
