import { importFileParser } from "../importFileParser/handler";
import { Readable } from "stream";

const mockS3getObject = jest.fn();
const mockS3copyObject = jest.fn();
const mockS3deleteObject = jest.fn();
const mockSQSSendMessage = jest.fn();

jest.mock("aws-sdk", () => {
  return {
    S3: jest.fn(() => ({
      getObject: mockS3getObject,
      copyObject: mockS3copyObject,
      deleteObject: mockS3deleteObject,
    })),
    SQS: jest.fn(() => ({
      sendMessage: mockSQSSendMessage,
    })),
  };
});

describe("importFileParser", () => {
  beforeEach(() => {
    mockS3getObject.mockReset();
    mockS3copyObject.mockReset();
    mockS3deleteObject.mockReset();
    mockSQSSendMessage.mockReset();
  });

  test("should call s3.getObject s3.copyObject s3.deleteObject methods, sqs.sendMessage method", async () => {
    const mockedStreamData = [
      {
        id: 1,
      },
      {
        id: 2,
      },
      {
        id: 3,
      },
    ];

    const mockedEvent = {
      Records: [
        {
          s3: {
            object: {
              key: "uploaded/filename1",
            },
          },
        },
      ],
    } as any;

    mockS3getObject.mockImplementation((_params) => ({
      createReadStream() {
        return Readable.from(
          mockedStreamData.map((row) => Buffer.from(JSON.stringify(row)))
        );
      },
    }));

    mockS3copyObject.mockImplementation((_params) => ({
      promise() {
        return Promise.resolve();
      },
    }));

    mockS3deleteObject.mockImplementation((_params) => ({
      promise() {
        return Promise.resolve();
      },
    }));

    mockSQSSendMessage.mockImplementation((_params) => ({
      promise() {
        return Promise.resolve();
      },
    }));

    await importFileParser(mockedEvent);

    expect(mockS3getObject).toBeCalled();
    expect(mockS3copyObject).toBeCalled();
    expect(mockS3deleteObject).toBeCalled();
  });
});
