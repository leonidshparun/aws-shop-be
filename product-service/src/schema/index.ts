import product from './product';
import productList from './product-list';
import error from './error';

export const enum ResponseModel {
  Product = 'ProductResponse',
  ProductList = 'ProductListResponse',
  Error = 'ErrorResponse',
}

export const ResponseSchema = {
  [ResponseModel.Product]: product,
  [ResponseModel.ProductList]: productList,
  [ResponseModel.Error]: error,
};
