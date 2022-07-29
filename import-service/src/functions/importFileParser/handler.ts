import { middyfy } from "@libs/lambda";
import { S3Event } from "aws-lambda";
import { S3 } from "aws-sdk";
import csv from "csv-parser";

export const importFileParser = async (event: S3Event) => {
  const { S3_IMPORT_BUCKET, S3_BUCKET_REGION } = process.env;
  const s3 = new S3({ region: S3_BUCKET_REGION });
  try {
    for (const record of event.Records) {
      const readableStream = s3
        .getObject({ Bucket: S3_IMPORT_BUCKET, Key: record.s3.object.key })
        .createReadStream();

      await new Promise((resolve, reject) => {
        const fetchData = [];

        readableStream
          .pipe(csv())
          .on("data", (row) => {
            fetchData.push(row);
            console.log(row);
          })
          .on("end", () => {
            console.log("CSV file successfully processed");
            resolve(fetchData);
          })
          .on("error", reject);
      });

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
