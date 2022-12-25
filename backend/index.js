const express = require("express");
require("dotenv").config();
const app = express();
const routerAuth = require("./src/routes/auth");
const { connectMDB } = require("./src/config/mongo");
const { auth } = require("./src/middlewares/auth");
const cors = require("cors");
const createHttpError = require("http-errors");
const cookieParser = require("cookie-parser");
const { serialize } = require("cookie");

connectMDB();

app.use("/public", express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(cookieParser(process.env.SECRET));

app.use("/auth", routerAuth);

app.use((req, res, next) => {
  next(createHttpError(404));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(process.env.PORT, () =>
  console.log(`Server is open in http://localhost:${process.env.PORT}`)
);
