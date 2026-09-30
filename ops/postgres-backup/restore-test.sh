#!/bin/sh
set -eu

: "${DATABASE_URL:?DATABASE_URL must point to an isolated restore-test database}"
: "${AWS_ENDPOINT_URL:?AWS_ENDPOINT_URL is required}"
: "${AWS_ACCESS_KEY_ID:?AWS_ACCESS_KEY_ID is required}"
: "${AWS_SECRET_ACCESS_KEY:?AWS_SECRET_ACCESS_KEY is required}"
: "${AWS_S3_BUCKET_NAME:?AWS_S3_BUCKET_NAME is required}"

file="/tmp/matholympiad-restore-test.dump"
trap 'rm -f "$file"' EXIT

latest="$(aws s3 ls "s3://${AWS_S3_BUCKET_NAME}/postgres/" --endpoint-url "$AWS_ENDPOINT_URL" --recursive | sort | tail -n 1 | awk '{print $4}')"
[ -n "$latest" ] || { echo "No PostgreSQL backup was found." >&2; exit 1; }

aws s3 cp "s3://${AWS_S3_BUCKET_NAME}/${latest}" "$file" --endpoint-url "$AWS_ENDPOINT_URL" --only-show-errors
pg_restore --clean --if-exists --no-owner --no-acl --dbname "$DATABASE_URL" "$file"

counts="$(psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -Atc 'SELECT (SELECT count(*) FROM "user"), (SELECT count(*) FROM content), (SELECT count(*) FROM uploads), (SELECT count(*) FROM attempts);')"
users="$(printf '%s' "$counts" | cut -d'|' -f1)"
content="$(printf '%s' "$counts" | cut -d'|' -f2)"
[ "${users:-0}" -gt 0 ] || { echo "Restore validation failed: no users." >&2; exit 1; }
[ "${content:-0}" -gt 0 ] || { echo "Restore validation failed: no content." >&2; exit 1; }

echo "RESTORE TEST PASSED"
echo "Backup object: ${latest}"
echo "Restored counts (users|content|uploads|attempts): ${counts}"
