import { getProductList } from '../src/mock/mock-db';
import { formatJSONResponse } from '../src/libs/api-gateway';
import { getProductsList as handler } from '../src/functions/getProductsList/handler';

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
      const { products } = JSON.parse(resultFromHandler.body);

      expect(Array.isArray(products)).toEqual(true);
    }
  });

  it('should return JSON response with mocked product list', async () => {
    const resultFromHandler = await handler(null, null, null);

    const mockedData = await getProductList();
    const mockedResult = formatJSONResponse({ products: mockedData });

    expect(mockedResult).toEqual(resultFromHandler);
  });
});
