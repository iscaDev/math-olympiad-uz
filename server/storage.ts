import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { dataDir, production } from './config';

const endpoint = process.env.AWS_ENDPOINT_URL || process.env.BUCKET_ENDPOINT || process.env.ENDPOINT;
const bucket = process.env.AWS_S3_BUCKET_NAME || process.env.BUCKET_NAME || process.env.BUCKET;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID || process.env.BUCKET_ACCESS_KEY_ID || process.env.ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || process.env.BUCKET_SECRET_ACCESS_KEY || process.env.SECRET_ACCESS_KEY;
const region = process.env.AWS_DEFAULT_REGION || process.env.BUCKET_REGION || process.env.REGION || 'auto';
const useBucket = Boolean(endpoint && bucket && accessKeyId && secretAccessKey);

if (production && !useBucket) {
  throw new Error('Production requires a private S3-compatible storage bucket.');
}

const s3 = useBucket ? new S3Client({
  endpoint,
  region,
  credentials: { accessKeyId: accessKeyId!, secretAccessKey: secretAccessKey! },
  forcePathStyle: (process.env.AWS_S3_URL_STYLE || '').toLowerCase() === 'path',
}) : null;

const localPath = (key: string) => join(dataDir, 'uploads', key);

export async function storeFile(key: string, body: Buffer, contentType: string) {
  if (s3) {
    await s3.send(new PutObjectCommand({
      Bucket: bucket!,
      Key: key,
      Body: body,
      ContentType: contentType,
    }));
    return;
  }
  const path = localPath(key);
  await mkdir(path.slice(0, path.lastIndexOf('/')), { recursive: true, mode: 0o700 });
  await writeFile(path, body, { mode: 0o600 });
}

export async function loadFile(key: string) {
  if (s3) {
    const response = await s3.send(new GetObjectCommand({ Bucket: bucket!, Key: key }));
    if (!response.Body) throw new Error('Stored file has no body.');
    return Buffer.from(await response.Body.transformToByteArray());
  }
  return readFile(localPath(key));
}

export async function removeFile(key: string) {
  if (s3) {
    await s3.send(new DeleteObjectCommand({ Bucket: bucket!, Key: key }));
    return;
  }
  await rm(localPath(key), { force: true });
}

export const objectStorageReady = useBucket;
