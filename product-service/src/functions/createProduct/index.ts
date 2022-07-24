import { handlerPath } from '@libs/handler-resolver';

import { createProductRequestModel, createProductResponseModel } from './schema';
import { errorResponseModel } from '@schema/error';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'products',
        cors: true,
        response: {
          headers: {
            'Content-Type': 'application/json',
          },
        },
        documentation: {
          summary: 'Create product',
          description: 'Returns a single newly created product',
          requestModels: {
            'application/json': createProductRequestModel.name,
          },
          requestBody: {
            description: 'Request body description',
          },
          methodResponses: [
            {
              statusCode: '200',
              responseBody: {
                description: 'A newly created product',
              },
              responseModels: {
                'application/json': createProductResponseModel.name,
              },
            },
            {
              statusCode: '404',
              responseBody: {
                description: 'Product not found',
              },
              responseModels: {
                'application/json': errorResponseModel.name,
              },
            },
          ],
        },
      },
    },
  ],
};
