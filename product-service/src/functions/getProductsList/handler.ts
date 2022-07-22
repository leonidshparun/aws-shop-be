import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import { getProductList } from '../../mock/mock-db';
import schema from './schema';

export const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  try {
    const items = await getProductList();

    return formatJSONResponse({ items });
  } catch (error) {
    return formatJSONResponse({ message: error.message }, 404);
  }
};

export const main = middyfy(getProductsList);
