const Contenedor = require("./Contenedor");
const contenedor = new Contenedor("productos.json");

const express = require("express");
const { Router } = express;
const app = express();
const router = Router();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/productos", router);
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () =>
  console.log(
    `Servidor iniciado escuchando por el puerto ${server.address().port}`
  )
);
server.on("error", (error) => console.log(`Error en el servidor ${error}`));

router.get("/", async (req, res) => {
  const listProducts = await contenedor.getAll();
  res.json(listProducts);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const producto = await contenedor.getById(parseInt(id));
  if (producto !== null) {
    res.json(producto);
  } else {
    res.json({ error: "producto no encontrado" });
  }
});

router.post("/", async (req, res) => {
  const { body } = req;
  const idAsignado = await contenedor.save(body);
  res.json({ success: "ok", new: { ...body, id: idAsignado } });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const reemplazo = { ...body };
  const newProduct = await contenedor.modifyProduct(parseInt(id), reemplazo);
  if (newProduct !== null) {
    res.json({ success: "ok", new: { ...newProduct } });
  } else {
    res.json({ error: "producto no encontrado" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const productoEncontrado = await contenedor.getById(parseInt(id));
  console.log("producto encontrado", productoEncontrado);
  if (productoEncontrado !== null) {
    await contenedor.deleteById(parseInt(id));
  } else {
    res.json({ error: "producto no encontrado" });
  }
});
