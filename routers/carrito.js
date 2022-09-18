const express = require("express");
const { carritoDaos: Carrito } = require("../daos/mainDaos");
const { productosDaos: Producto } = require("../daos/mainDaos");
const routerCarrito = express.Router();

const carritosBD = new Carrito("carrito");
const productosBD = new Producto();

routerCarrito.post("/", async (req, res) => {
  try {
    const timestamp = Date.now();
    const productos = [];
    const idAsignado = await carritosBD.save({ timestamp, productos });
    res.status(200).send({
      status: 200,
      data: {
        idAsignado,
      },
      message: "carrito creado",
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: error.message,
    });
  }
});

routerCarrito.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await carritosBD.deleteById(id);
    res.status(200).send({
      status: 200,
      message: "carrito eliminado",
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: error.message,
    });
  }
});

routerCarrito.get("/:id/productos", async (req, res) => {
  try {
    const { id } = req.params;
    const carrito = await carritosBD.getById(id);
    if (carrito) {
      const productosDelCarrito = carrito.productos;
      res.status(200).send({
        status: 200,
        data: {
          productosDelCarrito,
        },
        message: "Productos del carrito encontrados",
      });
    } else {
      res.status(200).send({
        status: 200,
        message: "Este carrito no existe",
      });
    }
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: error.message,
    });
  }
});

routerCarrito.post("/:id/productos", async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const productoAgregar = await productosBD.getById(body.id);
    if (productoAgregar) {
      const productoAgregarParseado = {
        id: productoAgregar._id.toString(),
        timestamp: productoAgregar.timestamp,
        nombre: productoAgregar.nombre,
        descripcion: productoAgregar.descripcion,
        codigo: productoAgregar.codigo,
        foto: productoAgregar.foto,
        precio: productoAgregar.precio,
        stock: productoAgregar.stock,
      };
      const carrito = await carritosBD.getById(id);
      if (carrito) {
        const productosEnCarrito = carrito.productos;
        productosEnCarrito.push(productoAgregarParseado);
        await carritosBD.modify(id, {
          productos: productosEnCarrito,
        });
        res.status(200).send({
          status: 200,
          data: {
            productoAgregado: productoAgregarParseado,
          },
          message: "Agregaste un producto a tu carrito",
        });
      } else {
        res.status(200).send({
          status: 200,
          message: "Este carrito no existe",
        });
      }
    } else {
      res.status(200).send({
        status: 200,
        message: "Este producto no existe",
      });
    }
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: error.message,
    });
  }
});

routerCarrito.delete("/:id/productos/:id_prod", async (req, res) => {
  try {
    const { id, id_prod } = req.params;
    const carrito = await carritosBD.getById(id);
    let productosCarrito = carrito.productos;
    let productoExisteEnCarro;
    for (const prod of productosCarrito) {
      if (prod.id == id_prod) {
        productoExisteEnCarro = true;
        break;
      }
    }
    if (productoExisteEnCarro) {
      const newArray = productosCarrito.filter((e) => e.id != id_prod);
      await carritosBD.modify(id, { productos: newArray });
      res.status(200).send({
        status: 200,
        message: "Producto eliminado",
      });
    } else {
      res.status(200).send({
        status: 200,
        message: "Este producto no existe en el carro",
      });
    }
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: error.message,
    });
  }
});

module.exports = routerCarrito;
