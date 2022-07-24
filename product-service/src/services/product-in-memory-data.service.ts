import { uuid } from 'uuidv4';

import { Product } from '../models/product.model';
import mockResponseData from '../data/mock/mock-products.json';
import { ProductService } from './product-service.model';

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export class ProductInMemoryDataService implements ProductService {
  private readonly productList!: Product[];

  static create(): ProductInMemoryDataService {
    return new ProductInMemoryDataService();
  }

  constructor() {
    this.productList = mockResponseData;
  }

  async createProduct(
    product: Pick<Product, 'title' | 'description' | 'count' | 'price'>
  ): Promise<Product> {
    const newProductId = uuid();

    const newProduct = {
      ...product,
      id: newProductId,
    };

    this.productList.push(newProduct);

    return await this.getProductById(newProductId);
  }

  async getProductById(productId: string): Promise<Product> {
    await delay(20);

    const product = this.productList.find((product) => product.id === productId);

    if (product) {
      return product;
    } else {
      throw new Error(`Product with productId: "${productId}" not found!`);
    }
  }

  async getProducts(): Promise<Product[]> {
    await delay(20);
    return this.productList;
  }
}
