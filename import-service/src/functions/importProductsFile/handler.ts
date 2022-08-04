import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import { S3 } from "aws-sdk";

import schema from "./schema";

export const importProductsFile: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  try {
    const {
      S3_IMPORT_BUCKET,
      S3_UPLOAD_FOLDER,
      S3_SIGNED_URL_EXPIRE,
      S3_IMPORT_CONTENT_TYPE,
      S3_BUCKET_REGION,
    } = process.env;

    const fileName = event.queryStringParameters?.name;

    const s3 = new S3({ region: S3_BUCKET_REGION });

    const params = {
      Bucket: S3_IMPORT_BUCKET,
      Key: `${S3_UPLOAD_FOLDER}/${fileName}`,
      Expires: parseInt(S3_SIGNED_URL_EXPIRE, 10),
      ContentType: S3_IMPORT_CONTENT_TYPE,
    };

    const url = s3.getSignedUrl("putObject", params);

    return formatJSONResponse(url);
  } catch (error) {
    console.error(error);
  }
};

export const main = middyfy(importProductsFile);
