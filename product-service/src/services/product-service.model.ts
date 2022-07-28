import { Product } from '../models/product.model';

export interface ProductService {
  getProducts(): Promise<Product[]>;

  getProductById(productId: string): Promise<Product>;

  createProduct(
    product: Pick<Product, 'title' | 'description' | 'count' | 'price'>
  ): Promise<Product>;
}
