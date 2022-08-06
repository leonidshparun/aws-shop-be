import { SQSEvent } from 'aws-lambda';

import { middyfy } from '@libs/lambda';
import { ProductService } from '../../services/product-service.model';

export const catalogBatchProcess =
  (productDataService: ProductService) => async (event: SQSEvent) => {
    try {
      for (const record of event.Records) {
        await productDataService.createProduct(JSON.parse(record.body));
      }
    } catch (error) {
      console.log(error);
    }
  };

export const catalogBatchProcessHOF = (deps: ProductService) => middyfy(catalogBatchProcess(deps));
