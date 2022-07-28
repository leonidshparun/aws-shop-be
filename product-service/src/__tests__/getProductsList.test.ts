import { formatJSONResponse } from '@libs/api-gateway';
import { getProductsList } from '@functions/getProductsList/lambda';
import { ProductInMemoryDataService } from '../services/product-in-memory-data.service';

const mockedProductDataService = new ProductInMemoryDataService();

const handler = getProductsList(mockedProductDataService);

describe('getProductsList', () => {
  it('should return status code 200', async () => {
    const resultFromHandler = await handler(null, null, null);

    if (resultFromHandler) {
      const { statusCode } = resultFromHandler;

      expect(statusCode).toEqual(200);
    }
  });

  it('should return product list as array', async () => {
    const resultFromHandler = await handler(null, null, null);

    if (resultFromHandler) {
      const { items } = JSON.parse(resultFromHandler.body);

      expect(Array.isArray(items)).toEqual(true);
    }
  });

  it('should return JSON response with mocked product list', async () => {
    const resultFromHandler = await handler(null, null, null);

    const mockedData = await mockedProductDataService.getProducts();
    const mockedResult = formatJSONResponse({ items: mockedData });

    expect(mockedResult).toEqual(resultFromHandler);
  });
});
