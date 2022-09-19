import type { AWS } from "@serverless/typescript";

import importProductsFile from "@functions/importProductsFile";
import importFileParser from "@functions/importFileParser";

const serverlessConfiguration: AWS = {
  service: "import-service",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild"],
  useDotenv: true,
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    region: "eu-west-1",
    stage: "dev",
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: ["s3:ListBucket"],
        Resource: ["arn:aws:s3:::aws-shop-import-service"],
      },
      {
        Effect: "Allow",
        Action: ["s3:*"],
        Resource: ["arn:aws:s3:::aws-shop-import-service/*"],
      },
      {
        Effect: "Allow",
        Action: ["sqs:*"],
        Resource: [
          {
            "Fn::Join": [
              ":",
              [
                "arn:aws:sqs",
                { Ref: "AWS::Region" },
                { Ref: "AWS::AccountId" },
                "${param:queueName}",
              ],
            ],
          },
        ],
      },
    ],
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      S3_IMPORT_BUCKET: "${env:S3_IMPORT_BUCKET}",
      S3_UPLOAD_FOLDER: "${env:S3_UPLOAD_FOLDER}",
      S3_SIGNED_URL_EXPIRE: "${env:S3_SIGNED_URL_EXPIRE}",
      S3_IMPORT_CONTENT_TYPE: "${env:S3_IMPORT_CONTENT_TYPE}",
      S3_BUCKET_REGION: "${env:S3_BUCKET_REGION}",
      APP_REGION: "${env:APP_REGION}",
      SQS_URL: "${param:queueUrl}",
    },
  },
  resources: {
    Resources: {
      GatewayResponseDefault4XX: {
        Type: "AWS::ApiGateway::GatewayResponse",
        Properties: {
          ResponseParameters: {
            "gatewayresponse.header.Access-Control-Allow-Origin": "'*'",
            "gatewayresponse.header.Access-Control-Allow-Headers": "'*'",
          },
          ResponseType: "DEFAULT_4XX",
          RestApiId: {
            Ref: "ApiGatewayRestApi",
          },
        },
      },
    },
  },
  // import the function via paths
  functions: { importProductsFile, importFileParser },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
