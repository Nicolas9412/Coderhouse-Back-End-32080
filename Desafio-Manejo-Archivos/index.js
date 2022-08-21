const fs = require("fs");

class Contenedor {
  constructor(name) {
    this.name = name;
  }

  // Recibe un objeto, lo guarda en el archivo, devuelve el id asignado
  async save(obj) {
    try {
      let productos = await fs.promises.readFile(this.name, "utf-8");
      productos = JSON.parse(productos);
      if (productos.length !== 0) {
        productos.sort((a, b) => {
          return b.id - a.id;
        });
        const idAsignado = productos[0].id + 1;
        productos.push({ ...obj, id: idAsignado });
        await fs.promises.writeFile(this.name, JSON.stringify(productos));
        return idAsignado;
      } else {
        productos.push({ ...obj, id: 1 });
        await fs.promises.writeFile(this.name, JSON.stringify(productos));
        return 1;
      }
    } catch (error) {
      console.log("Algo salió mal!");
    }
  }
  async getById(id) {
    try {
      let productoCapturado;
      let productos = await fs.promises.readFile(this.name, "utf-8");
      productos = JSON.parse(productos);
      productos.forEach((prod) => {
        if (prod.id === id) {
          productoCapturado = prod;
        }
      });
      return productoCapturado || null;
    } catch (error) {
      console.log("Algo salió mal!");
    }
  }
  async getAll() {
    try {
      let productos = await fs.promises.readFile(this.name, "utf-8");
      productos = JSON.parse(productos);
      return productos;
    } catch (error) {
      console.log("Algo salió mal!");
    }
  }
  async deleteById(id) {
    try {
      let newProducts = [];
      let productos = await fs.promises.readFile(this.name, "utf-8");
      productos = JSON.parse(productos);
      productos.forEach((prod) => {
        if (prod.id !== id) {
          newProducts.push(prod);
        }
      });
      await fs.promises.writeFile(this.name, JSON.stringify(newProducts));
    } catch (error) {
      console.log("Algo salió mal!");
    }
  }
  async deleteAll() {
    await fs.promises.writeFile(this.name, "[]");
  }
}

async function main() {
  const contenedor = new Contenedor("productos.json");
  const res1 = await contenedor.save({
    title: "clavo",
    price: 3,
    trumbnail:
      "https://th.bing.com/th/id/OIP.XCvliWdXi0jou7_BxJn2iwHaHa?w=186&h=186&c=7&r=0&o=5&pid=1.7",
  });
  const res2 = await contenedor.getAll();
  const res3 = await contenedor.getById(1);
  const res4 = await contenedor.getById(10);
  await contenedor.deleteById(1);
  const res5 = await contenedor.getAll();
  await contenedor.deleteAll();
  const res6 = await contenedor.getAll();
  console.log("Resultado de guardar un producto en el archivo", res1);
  console.log("Lista de productos con el producto agregado !!!", res2);
  console.log("Producto encontrado!!!", res3);
  console.log(res4 === null && "No se encontro ese producto");
  console.log("Lista de productos con el producto eliminado !!!", res5);
  console.log("Lista sin productos", res6);
}

main();
