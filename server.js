const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const app = express();
const PORT = 8080;

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: "",
      mongoOptions: advancedOptions,
    }),
    secret: "top secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

const server = app.listen(PORT, () => {
  console.log(`Servidor levantado http://localhost:${server.address().port}`);
});
server.on("error", (error) => {
  console.log(`Error en el servidor ${error}`);
});
app.get("/login", (req, res) => {
  res.render("pages/login.ejs");
});

let usuario = "";

app.post("/login", (req, res) => {
  const { body } = req;
  usuario = body.usuario;
  console.log(body.usuario);
  res.render("pages/vistaProductos.ejs", { usuario });
});

app.get("/logout", (req, res) => {
  //req.session.destroy((err) => {
  //  if (err) {
  //    return res.json({ status: "Logout ERROR", body: err });
  //  }
  res.render("pages/logout.ejs", { usuario });
});
//});
