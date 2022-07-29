import { importFileParser } from "../importFileParser/handler";
import { Readable } from "stream";

const mockS3getObject = jest.fn();
const mockS3copyObject = jest.fn();
const mockS3deleteObject = jest.fn();

jest.mock("aws-sdk", () => {
  return {
    S3: jest.fn(() => ({
      getObject: mockS3getObject,
      copyObject: mockS3copyObject,
      deleteObject: mockS3deleteObject,
    })),
  };
});

describe("importFileParser", () => {
  beforeEach(() => {
    mockS3getObject.mockReset();
    mockS3copyObject.mockReset();
    mockS3deleteObject.mockReset();
  });

  test("should call s3.getObject s3.copyObject s3.deleteObject methods", async () => {
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

    mockS3getObject.mockImplementation((_params) => {
      let rowCount = 0;
      return {
        createReadStream() {
          return new Readable({
            objectMode: true,
            read: function (_size) {
              if (rowCount < mockedStreamData.length) {
                return this.push(
                  Buffer.from(JSON.stringify(mockedStreamData[rowCount++]))
                );
              } else {
                return this.push(null);
              }
            },
          });
        },
      };
    });

    mockS3copyObject.mockImplementation((_params) => {
      return {
        promise() {
          return Promise.resolve();
        },
      };
    });

    mockS3deleteObject.mockImplementation((_params) => {
      return {
        promise() {
          return Promise.resolve();
        },
      };
    });

    await importFileParser(mockedEvent);

    expect(mockS3getObject).toBeCalled();
    expect(mockS3copyObject).toBeCalled();
    expect(mockS3deleteObject).toBeCalled();
  });
});
