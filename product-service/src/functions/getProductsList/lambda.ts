import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import { getProductListRequest } from './schema';
import { ProductService } from '../../services/product-service.model';

export const getProductsList =
  (
    productDataService: ProductService
  ): ValidatedEventAPIGatewayProxyEvent<typeof getProductListRequest> =>
  async () => {
    try {
      const items = await productDataService.getProducts();

      return formatJSONResponse({ items });
    } catch (error) {
      return formatJSONResponse({ message: error.message }, 404);
    }
  };

export const getProductsListHOF = (deps: ProductService) => middyfy(getProductsList(deps));
