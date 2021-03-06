export const productSchema = {
  type: 'object',
  description: 'Product schema',
  properties: {
    id: {
      type: 'string',
      title: 'Unique ID of the product',
    },
    count: {
      type: 'number',
      title: 'Products left in stock',
      minimum: 0,
    },
    title: {
      type: 'string',
      title: 'Product title',
      minLength: 1
    },
    description: {
      type: 'string',
      title: 'Product description',
    },
    price: {
      type: 'number',
      title: 'Product price',
      minimum: 0,
    },
  },
  required: ['id', 'price', 'title', 'count'],
} as const;
