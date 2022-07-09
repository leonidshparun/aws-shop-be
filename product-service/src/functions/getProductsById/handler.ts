import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import { getProductById } from '../../mock/mock-db';
import schema from './schema';

export const getProductsById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const productId = event.pathParameters.productId;

  try {
    const product = await getProductById(productId);

    return formatJSONResponse({ ...product });
  } catch (error) {
    return formatJSONResponse({ message: error.message }, 404);
  }
};

export const main = middyfy(getProductsById);
