import { SQSEvent } from 'aws-lambda';
import { SNS } from 'aws-sdk';

import { middyfy } from '@libs/lambda';
import { ProductService } from '../../services/product-service.model';
import { formatJSONResponse } from '@libs/api-gateway';

export const catalogBatchProcess =
  (productDataService: ProductService) => async (event: SQSEvent) => {
    try {
      const { SNS_URL, APP_REGION } = process.env;
      const sns = new SNS({ region: APP_REGION });

      const productsId = [];

      for (const record of event.Records) {
        const product = await productDataService.createProduct(JSON.parse(record.body));
        productsId.push(product.id);
      }

      const message = `Created products: ${productsId.join(', ')}`;

      await sns
        .publish({
          Subject: 'New Products Id',
          TopicArn: SNS_URL,
          Message: message,
        })
        .promise();

      return formatJSONResponse({ message });
    } catch (error) {
      console.log(error);
    }
  };

export const catalogBatchProcessHOF = (deps: ProductService) => middyfy(catalogBatchProcess(deps));
