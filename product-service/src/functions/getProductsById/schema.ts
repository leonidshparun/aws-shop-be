import { productSchema } from '@schema/product';

export const getProductByIdRequestValidationSchema = {
  type: 'object',
  required: ['pathParameters'],
  properties: {
    pathParameters: {
      type: 'object',
      required: ['productId'],
      properties: {
        productId: {
          type: 'string',
        },
      },
    },
  },
} as const;

export const getProductByIdRequest = {};

export const getProductByIdResponseModel = {
  name: 'GetProductResponse',
  title: 'Product',
  description: 'GET Products request model',
  contentType: 'application/json',
  schema: {
    ...productSchema,
    description: 'Get Product response schema',
  },
};
