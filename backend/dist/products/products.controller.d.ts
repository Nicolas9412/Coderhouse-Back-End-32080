import { CreateProductDto } from 'src/dto/products';
import { Product } from 'src/interface/product/product.interface';
import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productService;
    constructor(productService: ProductsService);
    findAll(): Promise<Product[]>;
    create(createProductDto: CreateProductDto): Promise<void>;
    update(id: any, createProductDto: CreateProductDto): Promise<void>;
    delete(id: any): Promise<void>;
}
