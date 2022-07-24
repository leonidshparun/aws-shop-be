import middy from '@middy/core';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [new winston.transports.Console()],
});

const middleware = (): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
  const before: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (
    request
  ): Promise<void> => {
    const { pathParameters, body, queryStringParameters } = request.event;
    const message = JSON.stringify({
      pathParameters,
      body,
      queryStringParameters,
    });
    logger.info('**REQUEST** ' + message, { requestId: request.context.awsRequestId });
  };

  const after: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (
    request
  ): Promise<void> => {
    const { statusCode, body } = request.response;
    const message = JSON.stringify({
      statusCode,
      body: JSON.parse(body),
    });
    logger.info('**RESPONSE** ' + message, { requestId: request.context.awsRequestId });
  };

  const onError: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (
    request
  ): Promise<void> => {
    const { message, stack } = request.error;
    const errorMessage = JSON.stringify({
      message,
      stack,
    });
    logger.error('**ERROR** ' + errorMessage, { requestId: request.context.awsRequestId });
  };

  return {
    before,
    after,
    onError,
  };
};

export default middleware;
