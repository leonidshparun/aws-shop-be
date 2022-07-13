import type { AWS } from '@serverless/typescript';

import getProductsList from '@functions/getProductsList';
import getProductsById from '@functions/getProductsById';

import { ResponseModel, ResponseSchema } from '@schema/index';

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '3',
  plugins: ['serverless-aws-documentation', 'serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'eu-west-1',
    stage: 'dev',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  // import the function via paths
  functions: {
    getProductsList,
    getProductsById,
  },
  package: { individually: true },
  custom: {
    webpack: {
      webpackConfig: 'webpack.config.js',
      includeModules: true,
      packager: 'npm',
      excludeFiles: 'src/**/*.test.ts',
      concurrency: 10,
    },
    documentation: {
      api: {
        info: {
          version: '0.0.1',
          title: 'My AWS shop API',
          description: 'This is my AWS shop API',
        },
      },
      models: [
        {
          name: ResponseModel.Product,
          title: 'Product',
          description: 'GET Products request model',
          contentType: 'application/json',
          schema: ResponseSchema[ResponseModel.Product],
        },
        {
          name: ResponseModel.ProductList,
          title: 'Product List',
          description: 'GET Product request model',
          contentType: 'application/json',
          schema: ResponseSchema[ResponseModel.ProductList],
        },
        {
          name: ResponseModel.Error,
          title: 'Error Response',
          description: 'Error response model',
          contentType: 'application/json',
          schema: ResponseSchema[ResponseModel.Error],
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
