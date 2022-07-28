import { Product } from '../models/product.model';
import { Client, ClientConfig } from 'pg';
import { Stock } from '../models/stock.model';
import { ProductService } from './product-service.model';

export class ProductDatabaseService implements ProductService {
  static create(): ProductDatabaseService {
    const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;

    const dbOptions: ClientConfig = {
      host: PG_HOST,
      port: parseInt(PG_PORT as string, 10),
      database: PG_DATABASE,
      user: PG_USERNAME,
      password: PG_PASSWORD,
      ssl: {
        rejectUnauthorized: false,
      },
      connectionTimeoutMillis: 5000,
    };

    const dbClient = new Client(dbOptions);

    dbClient.connect();

    return new ProductDatabaseService(dbClient);
  }

  constructor(private readonly dbClient: Client) {}

  async addProduct(
    product: Pick<Product, 'title' | 'description' | 'count' | 'price'>
  ): Promise<Product> {
    const productQuery =
      'INSERT INTO products(title, description, price) VALUES ($1, $2, $3) RETURNING *';
    const productValues = [product.title, product.description, product.price];

    const {
      rows: [newProduct],
    } = await this.dbClient.query<Product>(productQuery, productValues);

    if (!newProduct) {
      throw new Error(`Product "${product.title}" is not created`);
    }

    return newProduct;
  }

  async addStock(stock: Pick<Product, 'id' | 'count'>): Promise<Stock> {
    const stockQuery = 'INSERT INTO stocks(product_id, count) VALUES ($1, $2) RETURNING *';
    const stockValues = [stock.id, stock.count];

    const {
      rows: [newStock],
    } = await this.dbClient.query<Stock>(stockQuery, stockValues);

    if (!newStock) {
      throw new Error(`Stock for product with id="${newStock.product_id}" is not created`);
    }

    return newStock;
  }

  async createProduct(
    product: Pick<Product, 'title' | 'description' | 'count' | 'price'>
  ): Promise<Product> {
    try {
      await this.dbClient.query('BEGIN');

      const productRecord = await this.addProduct(product);
      const stockRecord = await this.addStock({
        id: productRecord.id,
        count: product.count,
      });

      const newProduct = await this.getProductById(stockRecord.product_id);

      await this.dbClient.query('COMMIT');

      return newProduct;
    } catch (error) {
      await this.dbClient.query('ROLLBACK');

      throw error;
    }
  }

  async getProductById(productId: string): Promise<Product> {
    const { rows: products } = await this.dbClient.query<Product>(
      `
      SELECT
          p.id,
          p.title,
          p.description,
          p.price,
          s.count
      FROM products p
          INNER JOIN stocks s
              ON p.id = s.product_id
      WHERE p.id=$1
    `,
      [productId]
    );

    const product = products[0];

    if (!product) {
      throw new Error(`Product with id="${productId}" not found`);
    }

    return product;
  }

  async getProducts(): Promise<Product[]> {
    const { rows } = await this.dbClient.query<Product>(`
      SELECT 
          p.id,
          p.title,
          p.description,
          p.price,
          s.count
      FROM products p 
          INNER JOIN stocks s 
              ON p.id = s.product_id
    `);

    return rows;
  }
}
