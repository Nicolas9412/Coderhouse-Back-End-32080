const config = require("./config");
const express = require("express");
const cors = require("cors");
const ProductsRouter = require("./routes/products");

const app = express();

if (config.NODE_ENV == "depeloment") app.use(cors());

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const ProductsRouter = new ProductsRouter();

app.use("/products", ProductsRouter.start());

const PORT = config.PORT || 8000;
const server = app.listen(PORT, () =>
  console.log(
    `Servidor express escuchando en el puerto ${PORT} (${config.NODE_ENV} - ${config.TIPO_PERSISTENCIA})`
  )
);
server.on("error", (error) => console.log("Servidor express en error:", error));
