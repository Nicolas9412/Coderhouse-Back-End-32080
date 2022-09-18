const express = require("express");
const { productosDaos: Producto } = require("../daos/mainDaos");
const routerProductos = express.Router();

const prod = new Producto();

routerProductos.get("/", async (req, res) => {
  try {
    const productos = await prod.getAll();
    if (productos.length !== 0) {
      res.status(200).send({
        status: 200,
        data: {
          productos,
        },
        message: "productos encontrados",
      });
    } else {
      res.status(200).send({
        status: 200,
        message: "No hay productos",
      });
    }
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: error.message,
    });
  }
});

routerProductos.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const unProducto = await prod.getById(id);
    if (unProducto) {
      res.status(200).send({
        status: 200,
        data: {
          unProducto,
        },
        message: "producto encontrado",
      });
    } else {
      res.status(200).send({
        status: 200,
        message: "No se encontró el producto",
      });
    }
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: error.message,
    });
  }
});

routerProductos.post("/", async (req, res) => {
  try {
    const { body } = req;
    const { nombre, descripcion, codigo, foto, precio, stock } = body;
    const timestamp = Date.now();
    const productoNuevo = {
      timestamp,
      nombre,
      descripcion,
      codigo,
      foto,
      precio: parseFloat(precio),
      stock: parseInt(stock),
    };
    await prod.save(productoNuevo);
    res.status(200).send({
      status: 200,
      message: "producto agregado",
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: error.message,
    });
  }
});

routerProductos.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let { body } = req;
    const { precio, stock } = body;
    const timestamp = Date.now();
    body = {
      ...body,
      timestamp,
      precio: parseFloat(precio),
      stock: parseInt(stock),
    };
    await prod.modifyProduct(id, body);
    res.status(200).send({
      status: 200,
      message: "producto modificado",
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: error.message,
    });
  }
});

routerProductos.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prod.deleteById(id);
    res.status(200).send({
      status: 200,
      message: "producto eleminado",
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: error.message,
    });
  }
});

module.exports = routerProductos;
