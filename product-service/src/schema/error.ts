const errorSchema = {
  type: 'object',
  description: 'Error response schema',
  properties: {
    message: {
      type: 'string',
      title: 'Error response description',
    },
  },
} as const;

export const errorResponseModel = {
  name: 'ErrorResponse',
  title: 'Error Response',
  description: 'Error response model',
  contentType: 'application/json',
  schema: errorSchema,
};
