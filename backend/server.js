import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import crypto from "crypto";
import cors from "cors";

const schema = buildSchema(`
  type Product {
    id: ID!
    title: String,
    price: Int,
    thumbnail: String
  }
  input ProductInput {
    title: String,
    price: Int,
    thumbnail: String
  }
  type Query {
    getProduct(id: ID!): Product,
    getProducts(field: String, value: String): [Product],
  }
  type Mutation {
    createProduct(datos: ProductInput): Product
    updateProduct(id: ID!, datos: ProductInput): Product,
    deleteProduct(id: ID!): Product,
  }
`);

class Product {
  constructor(id, { title, price, thumbnail }) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.thumbnail = thumbnail;
  }
}

const productsMap = {};

function getProducts({ campo, valor }) {
  const products = Object.values(productsMap);
  if (campo && valor) {
    return products.filter((p) => p[campo] == valor);
  } else {
    return products;
  }
}

function getProduct({ id }) {
  if (!productsMap[id]) {
    throw new Error("Product not found.");
  }
  return productsMap[id];
}

function createProduct({ datos }) {
  const id = crypto.randomBytes(10).toString("hex");
  const newProduct = new Product(id, datos);
  productsMap[id] = newProduct;
  return newProduct;
}

function updateProduct({ id, datos }) {
  if (!productsMap[id]) {
    throw new Error("Product not found");
  }
  const productUpdate = new Product(id, datos);
  productsMap[id] = productUpdate;
  return productUpdate;
}

function deleteProduct({ id }) {
  if (!productsMap[id]) {
    throw new Error("Product not found");
  }
  const productDelete = productsMap[id];
  delete productsMap[id];
  return productDelete;
}

const app = express();

app.use(express.static("public"));
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: {
      getProducts,
      getProduct,
      createProduct,
      updateProduct,
      deleteProduct,
    },
    graphiql: true,
  })
);

const PORT = 8080;
app.listen(PORT, () => {
  const msg = `Servidor corriendo en puerto: ${PORT}`;
  console.log(msg);
});
