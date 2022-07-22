import { handlerPath } from '@libs/handler-resolver';

import { ResponseModel } from '@schema/index';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products',
        documentation: {
          summary: 'Get All Products',
          description: 'Returns all products',
          methodResponses: [
            {
              statusCode: '200',
              responseBody: {
                description: 'A product list',
              },
              responseModels: {
                'application/json': ResponseModel.ProductList,
              },
            },
            {
              statusCode: '404',
              responseBody: {
                description: 'Products not found',
              },
              responseModels: {
                'application/json': ResponseModel.Error,
              },
            },
          ],
        },
      },
    },
  ],
};
