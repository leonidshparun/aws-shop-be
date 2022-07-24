import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';

import { getProductByIdRequestValidationSchema, getProductByIdRequest } from './schema';
import { ProductService } from '../../services/product-service.model';
import validator from '@middy/validator';
import { middyfy } from '@libs/lambda';

export const getProductsById =
  (
    productDataService: ProductService
  ): ValidatedEventAPIGatewayProxyEvent<typeof getProductByIdRequest> =>
  async (event) => {
    try {
      const productId = event.pathParameters.productId;

      const product = await productDataService.getProductById(productId);

      return formatJSONResponse(product);
    } catch (error) {
      return formatJSONResponse({ message: error.message }, 404);
    }
  };

const additionalMiddlewares = [
  validator({
    inputSchema: getProductByIdRequestValidationSchema,
  }),
];

export const getProductsByIdHOF = (deps: ProductService) =>
  middyfy(getProductsById(deps), additionalMiddlewares);
