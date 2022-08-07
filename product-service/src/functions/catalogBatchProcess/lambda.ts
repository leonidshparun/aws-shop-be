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

        const message = `New product added to stock: model: "${product.title}", price: ${product.price} BYN`;

        await sns
          .publish({
            Subject: 'E-shop: New product',
            TopicArn: SNS_URL,
            Message: message,
            MessageAttributes: {
              price: {
                DataType: 'Number',
                StringValue: product.price.toString(),
              },
            },
          })
          .promise();
      }

      const message = `Created products: ${productsId.join(', ')}`;

      return formatJSONResponse({ message });
    } catch (error) {
      console.log(error);
    }
  };

export const catalogBatchProcessHOF = (deps: ProductService) => middyfy(catalogBatchProcess(deps));
