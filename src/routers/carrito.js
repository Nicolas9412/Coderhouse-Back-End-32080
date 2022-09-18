const express = require("express");
const { carritoDaos: Carrito } = require("../daos/mainDaos");
const { productosDaos: Producto } = require("../daos/mainDaos");
const {
  productosCarritosDaos: ProductosCarritos,
} = require("../daos/mainDaos");
const routerCarrito = express.Router();

const carritosBD = new Carrito();
const productosBD = new Producto();
const productosCarritosBD = new ProductosCarritos();

const findClassName = (clase) => {
  const posExtends = clase.indexOf("extends");
  const firstKey = clase.indexOf("{");
  const className = clase.slice(posExtends + 7, firstKey).trim();
  return className;
};

const classNameCarrito = findClassName(carritosBD.constructor.toString());
const classNameProducto = findClassName(productosBD.constructor.toString());

routerCarrito.post("/", async (req, res) => {
  try {
    const timestamp = Date.now();
    const productos = [];
    let idAsignado;
    if (classNameCarrito != "ContenedorRelacional") {
      idAsignado = await carritosBD.save({ timestamp, productos });
    } else {
      idAsignado = await carritosBD.save({ timestamp });
    }
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
    const carrito = await carritosBD.getById(id);
    if (carrito) {
      if (classNameCarrito == "ContenedorRelacional") {
        if (carrito.length !== 0) {
          await carritosBD.deleteById(id);
          const productosAEliminar = await productosCarritosBD.getByProp(
            "idCarrito",
            id
          );
          for (const prod of productosAEliminar) {
            await productosCarritosBD.deleteById(prod.id);
          }
        } else {
          res.status(200).send({
            status: 200,
            message: "Este carrito no existe",
          });
          return;
        }
      } else {
        await carritosBD.deleteById(id);
      }
      res.status(200).send({
        status: 200,
        message: "carrito eliminado",
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

routerCarrito.get("/:id/productos", async (req, res) => {
  try {
    const { id } = req.params;
    const carrito = await carritosBD.getById(id);
    let productosDelCarrito = [];
    if (carrito) {
      if (classNameCarrito !== "ContenedorRelacional") {
        productosDelCarrito = carrito.productos;
      } else {
        if (carrito.length !== 0) {
          const productosEnCarro = await productosCarritosBD.getByProp(
            "idCarrito",
            id
          );
          for (const prod of productosEnCarro) {
            const res = await productosBD.getById(prod.idProducto);
            productosDelCarrito.push(res);
          }
        } else {
          res.status(200).send({
            status: 200,
            message: "Este carrito no existe",
          });
          return;
        }
      }
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
    let productoAgregarParseado;
    const { id } = req.params;
    const { body } = req;
    const productoAgregar = await productosBD.getById(body.id);
    if (productoAgregar) {
      if (classNameProducto === "ContenedorMongoDb") {
        productoAgregarParseado = {
          id: productoAgregar._id.toString(),
          timestamp: productoAgregar.timestamp,
          nombre: productoAgregar.nombre,
          descripcion: productoAgregar.descripcion,
          codigo: productoAgregar.codigo,
          foto: productoAgregar.foto,
          precio: productoAgregar.precio,
          stock: productoAgregar.stock,
        };
      } else {
        productoAgregarParseado = { ...productoAgregar };
      }
      const carrito = await carritosBD.getById(id);
      if (carrito) {
        if (classNameCarrito !== "ContenedorRelacional") {
          const productosEnCarrito = carrito.productos;
          for (const prod of productosEnCarrito) {
            if (prod.id == body.id) {
              res.status(200).send({
                status: 200,
                message: "Este producto ya está en el carro",
              });
              return;
            }
          }
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
          if (productoAgregar.length !== 0) {
            const productosEnCarrito = await productosCarritosBD.getByProp(
              "idCarrito",
              id
            );
            for (const prod of productosEnCarrito) {
              if (prod.idProducto == body.id) {
                res.status(200).send({
                  status: 200,
                  message: "Este producto ya está en el carro",
                });
                return;
              }
            }
            await productosCarritosBD.save({
              idCarrito: carrito[0].id,
              idProducto: productoAgregarParseado[0].id,
            });
            res.status(200).send({
              status: 200,
              data: {
                productoAgregado: productoAgregarParseado[0],
              },
              message: "Agregaste un producto a tu carrito",
            });
          } else {
            res.status(200).send({
              status: 200,
              message: "Este producto no existe",
            });
            return;
          }
        }
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
    let productosAEliminar;
    if (classNameCarrito !== "ContenedorRelacional") {
      for (const prod of productosCarrito) {
        if (prod.id == id_prod) {
          productoExisteEnCarro = true;
          break;
        }
      }
    } else {
      productosAEliminar = await productosCarritosBD.getByProp("idCarrito", id);
      productoExisteEnCarro = productosAEliminar.length != 0;
    }
    if (productoExisteEnCarro) {
      if (classNameCarrito !== "ContenedorRelacional") {
        const newArray = productosCarrito.filter((e) => e.id != id_prod);
        await carritosBD.modify(id, { productos: newArray });
        res.status(200).send({
          status: 200,
          message: "Producto eliminado",
        });
      } else {
        for (const prod of productosAEliminar) {
          if (prod.idProducto == id_prod) {
            await productosCarritosBD.deleteById(prod.id);
          }
        }
        res.status(200).send({
          status: 200,
          message: "Producto eliminado",
        });
      }
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
