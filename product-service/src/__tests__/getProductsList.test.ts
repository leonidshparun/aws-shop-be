import { getProductList } from '../mock/mock-db';
import { formatJSONResponse } from '@libs/api-gateway';
import { getProductsList as handler } from '@functions/getProductsList/handler';

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

    const mockedData = await getProductList();
    const mockedResult = formatJSONResponse({ items: mockedData });

    expect(mockedResult).toEqual(resultFromHandler);
  });
});
