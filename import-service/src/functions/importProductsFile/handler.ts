import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import { S3 } from "aws-sdk";

import schema from "./schema";

export const importProductsFile: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  const {
    S3_IMPORT_BUCKET,
    S3_UPLOAD_FOLDER,
    S3_SIGNED_URL_EXPIRE,
    S3_IMPORT_CONTENT_TYPE,
  } = process.env;

  const fileName = event.queryStringParameters?.name;

  const s3 = new S3({ region: "eu-west-1" });
  const catalogPath = `${S3_UPLOAD_FOLDER}/${fileName}`;

  const params = {
    Bucket: S3_IMPORT_BUCKET,
    Key: catalogPath,
    Expires: parseInt(S3_SIGNED_URL_EXPIRE, 10),
    ContentType: S3_IMPORT_CONTENT_TYPE,
  };

  const url = s3.getSignedUrl("putObject", params);

  return formatJSONResponse({
    url,
  });
};

export const main = middyfy(importProductsFile);
