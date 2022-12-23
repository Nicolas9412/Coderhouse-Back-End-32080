import { Injectable } from '@nestjs/common';
import { Product } from 'src/interface/product/product.interface';
import { randomBytes } from 'crypto';

@Injectable()
export class ProductsService {
  private products: Product[] = [];
  create(product: Product) {
    const id = randomBytes(10).toString('hex');
    this.products.push({ id, ...product });
  }
  findAll(): Product[] {
    return this.products;
  }
  update(id, product: Product) {
    const productFind = this.products.find((item) => item.id == id);
    const productUpdate = { ...productFind, ...product };
    this.products = this.products.filter((item) => item.id != id);
    this.products.push(productUpdate);
  }
  delete(id) {
    this.products = this.products.filter((item) => item.id != id);
  }
}
