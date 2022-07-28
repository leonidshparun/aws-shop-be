import { productSchema } from '@schema/product';

export const getProductListRequest = {} as const;

export const getProductListResponse = {
  type: 'object',
  description: 'Get Product list response schema',
  properties: {
    items: {
      type: 'array',
      items: productSchema,
    },
  },
  required: ['items'],
} as const;

export const getProductListResponseModel = {
  name: 'GetProductListResponse',
  title: 'Product List',
  description: 'GET Product request model',
  contentType: 'application/json',
  schema: getProductListResponse,
};
