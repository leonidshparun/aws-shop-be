import { ProductDatabaseService } from '../../services/product-database.service';
import { getProductsListHOF } from './lambda';

export const main = getProductsListHOF(ProductDatabaseService.create());
