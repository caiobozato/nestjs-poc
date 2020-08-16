import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];
  //Alternative syntax
  //products: Array<Product> = [];
  insertProduct(title: string, description: string, price: number): string {
    const id = Math.random().toString();
    const newProduct = new Product(id, title, description, price);
    this.products.push(newProduct);
    return id;
  }

  getProducts(): any {
    return [...this.products];
  }

  getProductById(id: string): Product {
    const product = this.findProduct(id)[0];
    return { ...product };
  }

  updateProduct(
    id: string,
    title: string,
    description: string,
    price: number,
  ): void {
    const [product, index] = this.findProduct(id);
    const newProduct = { ...product };
    if (title) {
      newProduct.title = title;
    }
    if (description) {
      newProduct.description = description;
    }
    if (price) {
      newProduct.price = price;
    }
    this.products[index] = newProduct;
  }

  deleteProduct(id: string): void {
    const index = this.findProduct(id)[1];
    this.products.splice(index, 1);
  }

  findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex(product => product.id === id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Biribinha');
    }
    return [product, productIndex];
  }
}
