#!/bin/sh
set -eu

: "${DATABASE_URL:?DATABASE_URL is required}"
: "${AWS_ENDPOINT_URL:?AWS_ENDPOINT_URL is required}"
: "${AWS_ACCESS_KEY_ID:?AWS_ACCESS_KEY_ID is required}"
: "${AWS_SECRET_ACCESS_KEY:?AWS_SECRET_ACCESS_KEY is required}"
: "${AWS_S3_BUCKET_NAME:?AWS_S3_BUCKET_NAME is required}"

stamp="$(date -u +%Y-%m-%dT%H-%M-%SZ)"
file="/tmp/matholympiad-${stamp}.dump"
trap 'rm -f "$file"' EXIT

pg_dump "$DATABASE_URL" --format=custom --compress=9 --no-owner --no-acl --file="$file"
aws s3 cp "$file" "s3://${AWS_S3_BUCKET_NAME}/postgres/${stamp}.dump" \
  --endpoint-url "$AWS_ENDPOINT_URL" \
  --only-show-errors

echo "Portable PostgreSQL backup uploaded: postgres/${stamp}.dump"
