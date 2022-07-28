import { productSchema } from '@schema/product';

export const createProductRequestSchema = {
  type: 'object',
  description: 'Post Product request schema',
  properties: {
    count: productSchema.properties.count,
    title: productSchema.properties.title,
    description: productSchema.properties.description,
    price: productSchema.properties.price,
  },
  required: ['price', 'title', 'count'],
} as const;

export const createProductRequestModel = {
  name: 'PostProductRequest',
  title: 'Product',
  description: 'POST Products request model',
  contentType: 'application/json',
  schema: createProductRequestSchema,
};

export const createProductResponseModel = {
  name: 'PostProductResponse',
  title: 'Product',
  description: 'POST Products response model',
  contentType: 'application/json',
  schema: productSchema,
};

export const createProductRequestValidationSchema = {
  type: 'object',
  required: ['body'],
  properties: {
    body: createProductRequestSchema,
  },
} as const;
