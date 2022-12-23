import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateProductDto } from 'src/dto/products';
import { Product } from 'src/interface/product/product.interface';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    this.productService.create(createProductDto);
  }
  @Put(':id')
  async update(@Param('id') id, @Body() createProductDto: CreateProductDto) {
    this.productService.update(id, createProductDto);
  }
  @Delete(':id')
  async delete(@Param('id') id) {
    this.productService.delete(id);
  }
}
