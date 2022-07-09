export default {
  $schema: 'http://json-schema.org/draft-04/schema#',
  type: 'object',
  description: 'Error response schema',
  properties: {
    message: {
      type: 'string',
      title: 'Error response description',
    },
  },
} as const;
