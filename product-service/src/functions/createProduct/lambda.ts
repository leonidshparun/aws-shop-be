import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';

import validator from '@middy/validator';
import { middyfy } from '@libs/lambda';

import { createProductRequestValidationSchema, createProductRequestSchema } from './schema';
import { ProductService } from '../../services/product-service.model';

export const createProduct =
  (
    productDataService: ProductService
  ): ValidatedEventAPIGatewayProxyEvent<typeof createProductRequestSchema> =>
  async (event) => {
    const data = event.body;

    try {
      const product = await productDataService.createProduct(data);

      return formatJSONResponse(product);
    } catch (error) {
      return formatJSONResponse({ message: error.message }, 404);
    }
  };

const additionalMiddlewares = [
  validator({
    inputSchema: createProductRequestValidationSchema,
  }),
];

export const createProductHOF = (deps: ProductService) =>
  middyfy(createProduct(deps), additionalMiddlewares);
