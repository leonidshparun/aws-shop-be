import { catalogBatchProcess } from '@functions/catalogBatchProcess/lambda';
import { ProductInMemoryDataService } from '../services/product-in-memory-data.service';

const mockedProductDataService = new ProductInMemoryDataService();

const handler = catalogBatchProcess(mockedProductDataService);

const mockSNSPublish = jest.fn();
jest.mock('aws-sdk', () => {
  return {
    SNS: jest.fn(() => ({
      publish: mockSNSPublish,
    })),
  };
});

const mockedSQSRecords = [
  {
    body: '{"title":1}',
  },
  {
    body: '{"title":2}',
  },
  {
    body: '{"title":3}',
  },
];

describe('catalogBatchProcess', () => {
  beforeEach(() => {
    mockSNSPublish.mockReset();
  });

  it('should return status code 200', async () => {
    const sqsEvent = {
      Records: mockedSQSRecords,
    } as any;

    mockSNSPublish.mockImplementation((_params) => ({
      promise() {
        return Promise.resolve();
      },
    }));

    const resultFromHandler = await handler(sqsEvent);

    if (resultFromHandler) {
      const { statusCode } = resultFromHandler;

      expect(statusCode).toEqual(200);
    }
  });

  it('should call sns.publish method', async () => {
    const sqsEvent = {
      Records: mockedSQSRecords,
    } as any;

    mockSNSPublish.mockImplementation((_params) => ({
      promise() {
        return Promise.resolve();
      },
    }));

    const resultFromHandler = await handler(sqsEvent);

    if (resultFromHandler) {
      expect(mockSNSPublish).toBeCalled();
    }
  });
});
