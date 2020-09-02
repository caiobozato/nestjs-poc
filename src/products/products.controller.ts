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
import {
  ApiOperation,
  ApiHeader,
  ApiTags,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
  ApiBody,
  ApiOkResponse,
} from '@nestjs/swagger';

import { Product } from './product.model';

@ApiHeader({
  name: 'auth',
  description: 'Authentication header',
})
@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Creates new product' })
  @ApiBody({
    description: 'New product data',
    required: true,
    type: Product,
  })
  @ApiCreatedResponse({
    description: 'Returns id for created product',
    schema: { example: { id: '5f47afdd39178d2a543f45e4' } },
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async addProduct(@Body() product: Product): Promise<{ id: string }> {
    const productId = await this.productsService.insertProduct(product);
    return { id: productId };
  }

  @Get()
  @ApiOperation({ summary: 'Gets all products' })
  @ApiOkResponse({
    description: 'Returns an array of products',
    type: Product,
    isArray: true,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getProducts(): Promise<any[]> {
    const products = await this.productsService.getProducts();
    return products;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a product by id' })
  @ApiOkResponse({ description: 'Returns a product', type: Product })
  @ApiUnauthorizedResponse({ description: 'Not authorized' })
  getProductById(@Param('id') id: string): any {
    return this.productsService.getProductById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a single product' })
  @ApiBody({
    description: 'Product data to be updated',
    required: true,
    type: Product,
  })
  @ApiOkResponse({
    schema: {
      example: {
        id: '5f47afdd39178d2a543f45e4',
        message: 'Product updated successfully',
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async updateProduct(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ): Promise<{ id: string; message: string }> {
    await this.productsService.updateProduct(id, title, description, price);
    return { id, message: 'Product updated successfully' };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a single product' })
  @ApiOkResponse({
    schema: {
      example: {
        id: '5f47afdd39178d2a543f45e4',
        message: 'Product deleted successfully',
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async deleteProductById(
    @Param('id') id: string,
  ): Promise<{ id: string; message: string }> {
    await this.productsService.deleteProduct(id);
    return { id, message: 'Product deleted successfully' };
  }
}
