const LocalStrategy = require("passport-local").Strategy;
const log4js = require("./logger");
const logger = log4js.getLogger();
const loggerArchivoError = log4js.getLogger("archivoError");
const Usuarios = require("../../models/schemaUsuario");
const {
  createHash,
  isValidPassword,
} = require("../../helpers/auth/helperAuth");

const initializeAuth = (passport) => {
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
};

module.exports = initializeAuth;
