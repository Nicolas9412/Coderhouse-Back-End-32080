const express = require("express");
const { productosDaos: Producto } = require("../daos/mainDaos");
const routerProductos = express.Router();

const productosBD = new Producto();
const isAdmin = true;

routerProductos.get("/", async (req, res) => {
  try {
    const productos = await productosBD.getAll();
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
        message: "no hay productos",
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
    const unProducto = await productosBD.getById(id);
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
        message: "el producto no existe",
      });
    }
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: error.message,
    });
  }
});

routerProductos.post(
  "/",
  (req, res, next) => {
    if (!isAdmin) {
      res.send({
        error: -1,
        descripcion: "ruta '/api/productos' método 'post' no autorizado",
      });
    } else {
      next();
    }
  },
  async (req, res) => {
    try {
      const { body } = req;
      const { nombre, descripcion, codigo, foto, precio, stock } = body;
      const timestamp = Date.now();
      const productoNuevo = {
        timestamp: parseInt(timestamp),
        nombre,
        descripcion,
        codigo,
        foto,
        precio: parseFloat(precio),
        stock: parseInt(stock),
      };
      await productosBD.save(productoNuevo);
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
  }
);

routerProductos.put(
  "/:id",
  (req, res, next) => {
    if (!isAdmin) {
      res.send({
        error: -1,
        descripcion: "ruta '/api/productos' método 'put' no autorizado",
      });
    } else {
      next();
    }
  },
  async (req, res) => {
    try {
      const { id } = req.params;
      let { body } = req;
      const timestamp = Date.now();
      body = {
        ...body,
        timestamp,
      };
      const result = await productosBD.modify(id, body);
      if (result) {
        res.status(200).send({
          status: 200,
          message: "producto modificado",
        });
      } else {
        res.status(200).send({
          status: 200,
          message: "el producto no existe",
        });
      }
    } catch (error) {
      res.status(500).send({
        status: 500,
        message: error.message,
      });
    }
  }
);

routerProductos.delete(
  "/:id",
  (req, res, next) => {
    if (!isAdmin) {
      res.send({
        error: -1,
        descripcion: "ruta '/api/productos' método 'delete' no autorizado",
      });
    } else {
      next();
    }
  },
  async (req, res) => {
    try {
      const { id } = req.params;
      const result = await productosBD.deleteById(id);
      if (result) {
        res.status(200).send({
          status: 200,
          message: "producto eliminado",
        });
      } else {
        res.status(200).send({
          status: 200,
          message: "el producto no existe",
        });
      }
    } catch (error) {
      res.status(500).send({
        status: 500,
        message: error.message,
      });
    }
  }
);

module.exports = { routerProductos, productosBD };
