const express = require("express");
require("dotenv").config();
const app = express();
const routerAuth = require("./src/routes/auth");
const { connectMDB } = require("./src/config/mongo");
const { auth } = require("./src/middlewares/auth");
const cors = require("cors");

connectMDB();

app.use("/public", express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/auth", routerAuth);

app.get("/api/datos", auth, (request, response) => {
  response.json({ receta: "El ingrediente secreto es pimientaaa" });
});

app.listen(process.env.PORT, () =>
  console.log(`Server is open in http://localhost:${process.env.PORT}`)
);
