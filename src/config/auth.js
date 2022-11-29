const { Strategy: LocalStrategy } = require("passport-local");
const { usuariosDaos: Usuario } = require("../daos/mainDaos");
const { createHash, isValidPassword } = require("../helpers/auth/helperAuth");

const usuariosBD = new Usuario();

const initializeAuth = (passport) => {
  passport.use(
    "login",
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await usuariosBD.getById(id);
        if (!user)
          return done(null, false, {
            message: "Usuario no encontrado",
          });

        if (!isValidPassword(password, user))
          return done(null, false, {
            message: "Password incorrecto",
          });

        return done(null, user);
      } catch (error) {
        return done(error);
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
          const user = await usuariosBD.getById(username);
          if (user)
            return done(null, false, {
              message: "El nombre de usuario ya esta en uso.",
            });
          const newUser = {
            username,
            password: createHash(password),
          };
          const response = await usuariosBD.save(newUser);
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

  passport.deserializeUser((id, done) => {
    Usuarios.findById(id, done);
  });
};

module.exports = initializeAuth;
