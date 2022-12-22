// deno-lint-ignore-file
import { Context, helpers } from "../deps.ts";
import type { Product } from "../types/product.ts";
import * as db from "../db/product.ts";

export const findProducts = async (ctx: Context) => {
  try {
    const products: Product[] = await db.findProducts();
    ctx.response.body = products;
  } catch (err) {
    ctx.response.status = 404;
    ctx.response.body = { msg: err.message };
  }
};

export const findProduct = async (ctx: Context) => {
  const { productId } = helpers.getQuery(ctx, { mergeParams: true });
  try {
    const product: Product = await db.findProductById(productId);
    ctx.response.body = product;
  } catch (err) {
    ctx.response.status = 404;
    ctx.response.body = { msg: err.message };
  }
};

export const createProduct = async (ctx: Context) => {
  try {
    const { title, price, thumbnail } = await ctx.request.body().value;
    const createdProduct: Product = await db.createProduct(
      title,
      price,
      thumbnail
    );
    ctx.response.body = createdProduct;
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.body = { msg: err.message };
  }
};
export const updateProduct = async (ctx: Context) => {
  const { productId } = helpers.getQuery(ctx, { mergeParams: true });
  const { title, price, thumbnail } = await ctx.request.body().value;
  try {
    const updatedProduct: Product = await db.updateProduct(
      productId,
      title,
      price,
      thumbnail
    );
    ctx.response.body = updatedProduct;
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.body = { msg: err.message };
  }
};

export const deleteProduct = async (ctx: Context) => {
  const { productId } = helpers.getQuery(ctx, { mergeParams: true });
  try {
    await db.deleteProduct(productId);
    ctx.response.body = { msg: "Product deleted!" };
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.body = { msg: err.message };
  }
};
