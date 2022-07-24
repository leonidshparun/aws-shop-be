import { getProductsByIdHOF } from '@functions/getProductsById/lambda';

import { ProductDatabaseService } from '../../services/product-database.service';

const productService = ProductDatabaseService.create();

export const main = getProductsByIdHOF(productService);
