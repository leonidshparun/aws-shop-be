import middy, { MiddlewareObj } from '@middy/core';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import httpErrorHandler from '@middy/http-error-handler';

import logger from './logger';

export const middyfy = (handler, additionalMiddlewares: MiddlewareObj[] = []) =>
  middy(handler).use([
    logger(),
    middyJsonBodyParser(),
    ...additionalMiddlewares,
    httpErrorHandler(),
  ]);
