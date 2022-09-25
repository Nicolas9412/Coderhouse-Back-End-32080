const fs = require("fs");

class ContenedorArchivos {
  constructor(name) {
    this.name = name;
  }

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
        productos.sort((a, b) => {
          return a.id - b.id;
        });
        await fs.promises.writeFile(
          this.name,
          JSON.stringify(productos, null, 2)
        );
        return idAsignado;
      } else {
        productos.push({ ...obj, id: 1 });
        await fs.promises.writeFile(
          this.name,
          JSON.stringify(productos, null, 2)
        );
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
        if (prod.id === parseInt(id)) {
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
      productos.sort((a, b) => {
        return a.id - b.id;
      });
      return productos;
    } catch (error) {
      console.log("Algo salió mal!");
      console.log(error);
    }
  }
  async deleteById(id) {
    try {
      const productoAEliminar = await this.getById(parseInt(id));
      if (productoAEliminar !== null) {
        let newProducts = [];
        let productos = await fs.promises.readFile(this.name, "utf-8");
        productos = JSON.parse(productos);
        productos.forEach((prod) => {
          if (prod.id !== parseInt(id)) {
            newProducts.push(prod);
          }
        });
        await fs.promises.writeFile(
          this.name,
          JSON.stringify(newProducts, null, 2)
        );
        return 1;
      } else {
        return null;
      }
    } catch (error) {
      console.log("Algo salió mal!");
    }
  }

  async modify(id, reemplazo) {
    try {
      let productos = await fs.promises.readFile(this.name, "utf-8");
      productos = JSON.parse(productos);
      const productoAModificar = await this.getById(parseInt(id));
      if (productoAModificar !== null) {
        await this.deleteById(parseInt(id));
        productos = await fs.promises.readFile(this.name, "utf-8");
        productos = JSON.parse(productos);
        const newProduct = { ...productoAModificar, ...reemplazo };
        productos.push(newProduct);
        productos.sort((a, b) => a.id - b.id);
        await fs.promises.writeFile(
          this.name,
          JSON.stringify(productos, null, 2)
        );
        return newProduct;
      } else {
        return null;
      }
    } catch (error) {
      console.log("Algo salió mal!");
    }
  }
}

module.exports = ContenedorArchivos;
