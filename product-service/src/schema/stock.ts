export const stockSchema = {
  type: 'object',
  description: 'Product stock schema',
  properties: {
    product_id: {
      type: 'string',
      title: 'Unique ID of the product',
    },
    count: {
      type: 'number',
      title: 'Products left in stock',
      minimum: 0,
    },
  },
  required: ['product_id', 'count'],
} as const;
