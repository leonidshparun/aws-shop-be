import { handlerPath } from '@libs/handler-resolver';
import { getProductListResponseModel } from '@functions/getProductsList/schema';
import { errorResponseModel } from '@schema/error';

export default {
  handler: `${handlerPath(__dirname)}`,
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
                'application/json': getProductListResponseModel.name,
              },
            },
            {
              statusCode: '404',
              responseBody: {
                description: 'Products not found',
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
