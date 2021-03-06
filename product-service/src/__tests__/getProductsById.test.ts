import { getProductsById } from '@functions/getProductsById/lambda';
import { ProductInMemoryDataService } from '../services/product-in-memory-data.service';

const mockedProductDataService = new ProductInMemoryDataService();

const handler = getProductsById(mockedProductDataService);

describe('getProductsById', () => {
  it('should return status code 200 if product exist', async () => {
    const mockedProductList = await mockedProductDataService.getProducts();
    const mockedProduct = mockedProductList[0];
    const mockedProductId = mockedProduct.id;

    const event = {
      pathParameters: {
        productId: mockedProductId,
      },
    } as any;

    const resultFromHandler = await handler(event, null, null);

    if (resultFromHandler) {
      const { statusCode } = resultFromHandler;

      expect(statusCode).toEqual(200);
    }
  });

  it('should return status code 404 if product not found', async () => {
    const mockedProductId = 'non-existing-product-id';

    const event = {
      pathParameters: {
        productId: mockedProductId,
      },
    } as any;

    const resultFromHandler = await handler(event, null, null);

    if (resultFromHandler) {
      const { statusCode } = resultFromHandler;

      expect(statusCode).toEqual(404);
    }
  });

  it('should return product item if product id of existing product provided', async () => {
    const mockedProductList = await mockedProductDataService.getProducts();
    const mockedProduct = mockedProductList[0];
    const mockedProductId = mockedProduct.id;

    const event = {
      pathParameters: {
        productId: mockedProductId,
      },
    } as any;

    const resultFromHandler = await handler(event, null, null);

    if (resultFromHandler) {
      const product = JSON.parse(resultFromHandler.body);

      expect(product).toEqual(mockedProduct);
    }
  });

  it('should return message if product id of existing product not provided', async () => {
    const mockedProductId = 'non-existing-product-id';

    const event = {
      pathParameters: {
        productId: mockedProductId,
      },
    } as any;

    const resultFromHandler = await handler(event, null, null);

    if (resultFromHandler) {
      const { product, message } = JSON.parse(resultFromHandler.body);

      const expectedMessage = `Product with productId: "${mockedProductId}" not found!`;

      expect(message).toEqual(expectedMessage);
      expect(product).toEqual(undefined);
    }
  });
});
