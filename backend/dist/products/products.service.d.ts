import { Product } from 'src/interface/product/product.interface';
export declare class ProductsService {
    private products;
    create(product: Product): void;
    findAll(): Product[];
    update(id: any, product: Product): void;
    delete(id: any): void;
}
