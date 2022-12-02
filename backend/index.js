const express = require("express");
require("dotenv").config();
const app = express();
const routerAuth = require("./src/routes/auth");

app.use("/public", express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", routerAuth);

app.listen(process.env.PORT, () =>
  console.log(`Server is open in http://localhost:${process.env.PORT}`)
);
