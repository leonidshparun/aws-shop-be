import { ProductDatabaseService } from '../services/product-database.service';
import { createProductHOF } from './createProduct/lambda';
import { getProductsByIdHOF } from './getProductsById/lambda';
import { getProductsListHOF } from './getProductsList/lambda';
import { catalogBatchProcessHOF } from './catalogBatchProcess/lambda';

const productService = ProductDatabaseService.create();

export const createProduct = createProductHOF(productService);
export const getProductsById = getProductsByIdHOF(productService);
export const getProductsList = getProductsListHOF(productService);
export const catalogBatchProcess = catalogBatchProcessHOF(productService);
