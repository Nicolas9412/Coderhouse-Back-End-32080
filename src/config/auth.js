const { Strategy: LocalStrategy } = require("passport-local");
const parseArgs = require("minimist");
const args = parseArgs(process.argv.slice(2));
const { createHash, isValidPassword } = require("../helpers/auth/helperAuth");

const UsuariosFactoryDAO = require("../daos/usuarios/UsuariosFactory");

const usuariosBD = UsuariosFactoryDAO.get(args.p || process.env.TYPE_PERSIST);

const initializeAuth = (passport) => {
  passport.use(
    "login",
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await usuariosBD.getByEmail(username);
        console.log("El usuario encontrado es ", user);
        if (!user)
          return done(null, false, {
            message: "Usuario no encontrado",
          });

        if (!isValidPassword(user, password))
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
          console.log(username);
          const user = await usuariosBD.getByEmail(username);
          if (user)
            return done(null, false, {
              message: "El nombre de usuario ya esta en uso.",
            });
          const newUser = {
            username,
            password: createHash(password),
          };
          const response = await usuariosBD.save(newUser);
          console.log("respuesta", response);
          return done(null, response);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    console.log("useerr", user);
    done(null, user._id || user);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await usuariosBD.getById(id);
    done(null, user || id._id);
  });
};

module.exports = initializeAuth;
