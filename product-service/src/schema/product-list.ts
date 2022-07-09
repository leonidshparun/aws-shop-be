import product from '@schema/product';

export default {
  $schema: 'http://json-schema.org/draft-04/schema#',
  type: 'object',
  description: 'Product list schema',
  properties: {
    items: {
      type: 'array',
      items: product,
    },
  },
  required: ['items'],
} as const;
