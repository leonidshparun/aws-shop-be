import { importProductsFile } from "../importProductsFile/handler";
import { formatJSONResponse } from "@libs/api-gateway";

const mockS3getSignedUrl = jest.fn();
jest.mock("aws-sdk", () => {
  return {
    S3: jest.fn(() => ({
      getSignedUrl: mockS3getSignedUrl,
    })),
  };
});

describe("importProductsFile", () => {
  beforeEach(() => {
    mockS3getSignedUrl.mockReset();
  });

  test("should return formatted response with signed Url", async () => {
    const mockedSignedUrl = "signed-url-mock";
    const mockedEvent = {
      queryStringParameters: {
        name: "fileName",
      },
    } as any;

    mockS3getSignedUrl.mockImplementation(
      (_operation, _params) => mockedSignedUrl
    );

    const response = await importProductsFile(mockedEvent, null, null);

    expect(response).toEqual(formatJSONResponse({ url: mockedSignedUrl }));
  });

  test("should return formatted response with status code 200", async () => {
    const mockedSignedUrl = "signed-url-mock";
    const mockedEvent = {
      queryStringParameters: {
        name: "fileName",
      },
    } as any;

    mockS3getSignedUrl.mockImplementation(
      (_operation, _params) => mockedSignedUrl
    );

    const response = await importProductsFile(mockedEvent, null, null);

    if (response) {
      const { statusCode } = response;
      expect(statusCode).toEqual(200);
    }
  });
});
