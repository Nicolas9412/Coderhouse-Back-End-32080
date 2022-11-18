const { isValidPassword, createHash } = require("../utils/isValidPassword.js");
const { usuariosDaos: Usuario } = require("../daos/mainDaos");
const { Strategy: LocalStrategy } = require("passport-local");
const sendMail = require("../utils/sendMail");

const usuariosBD = new Usuario();

const initialize = (passport) => {
  passport.use(
    "login",
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await usuariosBD.getByEmail(username);
        if (!user)
          return done(null, false, {
            message: "Usuario no encontrado",
          });

        if (!isValidPassword(password, user))
          return done(null, false, {
            message: "Password incorrecto",
          });

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.use(
    "signup",
    new LocalStrategy(
      {
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        try {
          const { nombre, direccion, edad, telefono } = req.body;
          const user = await usuariosBD.getByEmail(username);
          if (user)
            return done(null, false, {
              message: "El nombre de usuario ya esta en uso.",
            });
          const newUser = {
            username,
            password: createHash(password),
            nombre,
            direccion,
            edad,
            telefono,
            imagen: req.file.filename,
          };
          const response = await usuariosBD.save(newUser);
          await sendMail(
            process.env.ADMIN_EMAIL,
            "Nuevo Registro",
            JSON.stringify(newUser, null, 2)
          );
          return done(null, response);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await usuariosBD.getById(id);
    done(null, user);
  });
};

module.exports = initialize;
