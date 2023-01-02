const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { auth } = require("../src/middlewares/auth");

const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(
  MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("connected to the database");
  }
);

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);

const authRouter = require("./routes/auth");
const productRouter = require("./routes/products");
const cartRouter = require("./routes/cart");
const categoryRouter = require("./routes/category");
const ordersRouter = require("./routes/orders");
app.use("/api/auth", authRouter);
app.use("/productos", productRouter);
app.use("/carrito", cartRouter);
app.use("/categorias", categoryRouter);
app.use("/ordenes", ordersRouter);

app.get("/api/datos", auth, (req, res) => {
  res.json({ msg: "El ingrediente secreto es pimienta..." });
});

app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
