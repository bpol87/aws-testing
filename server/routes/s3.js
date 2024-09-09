import { S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
    region: process.env.AWS_ACCOUNT_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCOUNT_ACCESS_KEY,
      secretAccessKey: process.env.AWS_ACCOUNT_SECRET_ACCESS_KEY,
    },
  });

export default s3Client;