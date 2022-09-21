const express = require("express");
const { routerProductos } = require("./src/routers/productos");
const routerCarrito = require("./src/routers/carrito");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/productos", routerProductos);
app.use("/api/carrito", routerCarrito);

app.all("*", (req, res) => {
  res.json({
    error: -2,
    descripcion: `ruta '${req.url}' método '${req.method}' no implementado`,
  });
});

/* Server Listen */
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () =>
  console.log(`servidor Levantado ${PORT}`)
);
server.on("error", (error) => console.log(`Error en servidor ${error}`));
