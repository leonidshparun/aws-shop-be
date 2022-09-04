import { middyfy } from "@libs/lambda";
import { S3Event } from "aws-lambda";
import { S3, SQS } from "aws-sdk";
import csv from "csv-parser";

import { productSchema } from "../../schema/product";

type ProductRow = typeof productSchema;

export const importFileParser = async (event: S3Event) => {
  const { S3_IMPORT_BUCKET, S3_BUCKET_REGION, SQS_URL, APP_REGION } =
    process.env;

  const sqs = new SQS({ region: APP_REGION });
  const s3 = new S3({ region: S3_BUCKET_REGION });

  try {
    for (const record of event.Records) {
      const readableStream = s3
        .getObject({ Bucket: S3_IMPORT_BUCKET, Key: record.s3.object.key })
        .createReadStream();

      const rows = await new Promise<ProductRow[]>((resolve, reject) => {
        const fetchData: ProductRow[] = [];

        readableStream
          .pipe(csv())
          .on("data", (row: ProductRow) => {
            fetchData.push(row);
          })
          .on("end", () => {
            resolve(fetchData);
          })
          .on("error", reject);
      });

      for (const row of rows) {
        await sqs
          .sendMessage({
            QueueUrl: SQS_URL,
            MessageBody: JSON.stringify(row),
          })
          .promise();
      }

      const parsedFileName = record.s3.object.key.replace("uploaded", "parsed");

      await s3
        .copyObject({
          Bucket: S3_IMPORT_BUCKET,
          CopySource: `${S3_IMPORT_BUCKET}/${record.s3.object.key}`,
          Key: parsedFileName,
        })
        .promise();

      await s3
        .deleteObject({
          Bucket: S3_IMPORT_BUCKET,
          Key: record.s3.object.key,
        })
        .promise();

      console.log(`Moved into ${S3_IMPORT_BUCKET}/${parsedFileName}`);
    }
  } catch (error) {
    console.error(error);
  }
};

export const main = middyfy(importFileParser);
