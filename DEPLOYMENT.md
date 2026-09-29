# Controlled deployment checklist

Complete these stages in order. Stop if a verification fails.

## 1. Local recovery point — complete

- Current application committed locally before infrastructure changes.
- Private pre-migration backup created and verified.
- Backup contains 2 users, 26 content records, 4 upload records, all 4 upload files, and the authentication secret.
- PostgreSQL/object-storage work is isolated on the `production-readiness` branch.

## 2. Production-ready code — in progress

- PostgreSQL compatibility added for production.
- Private S3-compatible object storage added for production.
- Guarded SQLite-to-PostgreSQL migration added.
- Daily portable PostgreSQL backup job added.
- Compiler, eight backend integration checks, and frontend production build pass.
- Remaining: test against real Railway PostgreSQL and bucket.

## 3. Private GitHub repository

1. Sign in to GitHub in the browser.
2. Create a private repository named `math-olympiad-uz`.
3. Push only tracked source files.
4. Confirm `data/`, `backups/`, `.env*`, and build output are absent.
5. Enable two-factor authentication and save recovery codes.

## 4. Railway staging

1. Create a Railway project on the Hobby plan initially.
2. Add a PostgreSQL service in the closest practical region.
3. Add a private uploads bucket in the same region.
4. Add the backend from the private GitHub repository.
5. Inject database and bucket credentials through Railway references.
6. Set a temporary staging HTTPS origin, email credentials, and one permanent authentication secret plus a separate Vercel-to-Railway gateway secret.
7. Set compute usage alerts and a hard limit high enough that a small traffic spike does not immediately take the site offline.
8. Deploy and verify `/health`.

## 5. Migrate current local data

1. Keep the verified local backup untouched.
2. Run the guarded migration against the new staging database and bucket.
3. Compare account, content, attempt, and upload counts.
4. Open every uploaded file type.
5. Never repeat the replacement migration after real public activity begins.

## 6. Backups and restore drill

1. Enable Railway daily, weekly, and monthly PostgreSQL volume backups.
2. Enable point-in-time recovery if available for the selected plan.
3. Create a second private bucket for database backups.
4. Deploy `ops/postgres-backup` as a daily Railway cron job.
5. Restore a portable dump into a temporary staging database.
6. Verify accounts, roles, content, attempts, and files.
7. Save the authentication secret in a password manager.
8. Download an encrypted off-platform copy on a regular schedule.

## 7. Transactional email

1. Connect a production email provider using the project domain.
2. Verify the sender domain records.
3. Test registration verification and password reset across major email providers.
4. Confirm failed email delivery does not create an inaccessible account flow.

## 8. Vercel staging and production

1. Import the private GitHub repository.
2. Set `BACKEND_URL` to the Railway backend.
3. Use a staging deployment first.
4. Run browser tests on desktop and mobile.
5. Choose a Vercel plan consistent with whether the project is personal/non-commercial or commercial.
6. Add the final domain only after staging passes.

## 9. OpenAI

1. Create a dedicated OpenAI project and restricted API key.
2. Add the key directly to Railway; never paste it into chat or GitHub.
3. Set a project budget and usage alerts.
4. Start with conservative daily platform and per-user limits.
5. Test hint mode, full-solution mode, refusal behavior, timeout handling, and exhausted-budget messages.

## 10. Launch and monitoring

1. Point the final domain to Vercel.
2. Run the full smoke-test checklist again on the final HTTPS domain.
3. Add external uptime monitoring for the website and backend health endpoint.
4. Watch Railway and OpenAI usage during the first week.
5. Keep the first launch announcement limited until backup restoration and email delivery have been observed in production.
