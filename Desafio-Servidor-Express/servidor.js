const Contenedor = require("./Contenedor");
const contenedor = new Contenedor("productos.json");

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () =>
  console.log(
    `Servidor iniciado escuchando por el puerto ${server.address().port}`
  )
);
server.on("error", (error) => console.log(`Error en el servidor ${error}`));

app.get("/", (req, res) => {
  res.send(`Bienvenido a mi primera api !!!
  GET /productos devuelve todos los productos
  GET /productoRandom devuelve un producto random`);
});

app.get("/productos", async (req, res) => {
  const listProducts = await contenedor.getAll();
  res.json(listProducts);
});

app.get("/productoRandom", async (req, res) => {
  const productRandom = await contenedor.getProductRandom();
  res.json(productRandom);
});
