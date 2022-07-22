import { handlerPath } from '@libs/handler-resolver';

import { ResponseModel } from '@schema/index';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products/{productId}',
        request: {
          parameters: {
            paths: {
              productId: true,
            },
          },
        },
        documentation: {
          summary: 'Get Product By Id',
          description: 'Returns a single product',
          pathParams: [
            {
              name: 'productId',
              description: 'ID of product to return',
              required: true,
            },
          ],
          methodResponses: [
            {
              statusCode: '200',
              responseBody: {
                description: 'A product with specified id',
              },
              responseModels: {
                'application/json': ResponseModel.Product,
              },
            },
            {
              statusCode: '404',
              responseBody: {
                description: 'Product not found',
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
