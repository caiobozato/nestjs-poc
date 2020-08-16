import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.model';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDescription: string,
    @Body('price') prodPrice: number,
  ): { id: string } {
    const productId = this.productsService.insertProduct(
      prodTitle,
      prodDescription,
      prodPrice,
    );
    return { id: productId };
  }

  @Get()
  getProducts(): Array<Product> {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProductById(@Param('id') id: string): any {
    return this.productsService.getProductById(id);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ): null {
    this.productsService.updateProduct(id, title, description, price);
    return null;
  }

  @Delete(':id')
  deleteProductById(@Param('id') id: string): { message: string } {
    this.productsService.deleteProduct(id);
    return { message: `Product with id ${id}, deleted` };
  }
}
