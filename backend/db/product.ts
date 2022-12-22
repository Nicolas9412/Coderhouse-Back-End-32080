// deno-lint-ignore-file
import type { Product, Uuid } from "../types/product.ts";
import { v1 } from "../deps.ts";

let products: Product[] = [];

//Fake Db Queries
export const findProductById = async (uuid: Uuid): Promise<Product> =>
  new Promise((resolve, reject) => {
    const productFind = products.find((item) => item.uuid == uuid);
    console.log("productFind", productFind);
    if (!productFind) {
      throw new Error("Product not found");
    }
    setTimeout(() => {
      resolve(productFind);
    }, 50);
  });

export const findProducts = async (): Promise<Product[]> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(products);
    }, 50);
  });

export const createProduct = async (
  title: string,
  price: number,
  thumbnail: string
): Promise<Product> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      products.push({
        uuid: v1.generate().toString(),
        title,
        price,
        thumbnail,
      });
      resolve({ uuid: v1.generate().toString(), title, price, thumbnail });
    }, 50);
  });

export const updateProduct = async (
  uuid: Uuid,
  title: string,
  price: number,
  thumbnail: string
): Promise<Product> =>
  new Promise((resolve, reject) => {
    products = products.filter((item) => item.uuid !== uuid);
    const newProductUpdated = {
      uuid,
      title,
      price,
      thumbnail,
    };
    products.push(newProductUpdated);
    setTimeout(() => {
      resolve(newProductUpdated);
    }, 50);
  });

export const deleteProduct = async (uuid: Uuid): Promise<void> => {
  products = products.filter((item) => item.uuid !== uuid);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 50);
  });
};
