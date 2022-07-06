import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import { getProductList } from '../../mock/mock-db';

const getProductsList: ValidatedEventAPIGatewayProxyEvent = async (_event) => {
  const products = await getProductList();

  return formatJSONResponse({ products });
};

export const main = middyfy(getProductsList);
