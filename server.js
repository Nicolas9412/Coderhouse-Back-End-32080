const express = require("express");
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

const server = app.listen(PORT, () => {
  console.log(`Servidor levantado http://localhost:${server.address().port}`);
});
server.on("error", (error) => {
  console.log(`Error en el servidor ${error}`);
});
app.get("/", (req, res) => {
  res.render("/pages/login.ejs");
});
