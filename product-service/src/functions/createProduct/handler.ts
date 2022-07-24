import { ProductDatabaseService } from '../../services/product-database.service';
import { createProductHOF } from './lambda';

const productService = ProductDatabaseService.create();

export const main = createProductHOF(productService);
