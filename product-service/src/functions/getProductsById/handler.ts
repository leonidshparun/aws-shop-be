import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import { getProductById } from '../../mock/mock-db';

export const getProductsById: ValidatedEventAPIGatewayProxyEvent = async (event) => {
  const productId = event.pathParameters.productId;

  try {
    const product = await getProductById(productId);

    return formatJSONResponse({
      product,
    });
  } catch (error) {
    return formatJSONResponse({
      message: error.message,
    });
  }
};

export const main = middyfy(getProductsById);
