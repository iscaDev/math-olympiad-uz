# Math Olympiad Uz — platform operations

The project lives at `~/Desktop/math-olympiad`. The public service is not live until every production verification in `DEPLOYMENT.md` passes.

## Architecture

- Vercel serves the Next.js frontend and proxies `/api/*` through the website origin.
- Railway runs the Express backend from the root `Dockerfile`.
- Railway PostgreSQL stores accounts, sessions, roles, content, notes, attempts, results, audits, and rate limits.
- A private Railway storage bucket stores uploaded PDFs and images.
- A second private bucket receives portable PostgreSQL dumps from a daily cron job.
- Local preview remains on SQLite plus `data/uploads`; production startup rejects SQLite and local-file storage.

PostgreSQL allows multiple concurrent writers and removes the single SQLite-file bottleneck. The backend uses a bounded connection pool. A future second backend replica can be added after production behavior and costs are measured.

## Required production secrets

Railway backend:

- `PUBLIC_APP_URL`: exact final HTTPS frontend origin, without a trailing slash.
- `DATABASE_URL`: private reference to the Railway PostgreSQL service.
- `DATABASE_POOL_SIZE=10`.
- `BETTER_AUTH_SECRET`: one strong generated value, at least 32 characters. Save it separately in a password manager.
- `BACKEND_PROXY_SECRET`: a different strong value shared only by Vercel and Railway; every production API route requires it.
- `BREVO_API_KEY` or `RESEND_API_KEY`, plus `EMAIL_FROM`. Railway Hobby blocks SMTP, so production email must use an HTTPS transactional-email API. SMTP variables remain available as a local or Railway Pro fallback.
- Bucket references: `AWS_ENDPOINT_URL`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_S3_BUCKET_NAME`, `AWS_DEFAULT_REGION`, and `AWS_S3_URL_STYLE`.
- Optional: `OPENAI_API_KEY`, `OPENAI_MODEL`, and daily request limits.

Vercel frontend:

- `BACKEND_PROXY_SECRET`: the same gateway value used by Railway.
- `BACKEND_URL`: Railway backend HTTPS origin.
- Do not set `LOCAL_PREVIEW` in production.

Never put a secret in GitHub, Vercel client variables, screenshots, support messages, or chat.

## Accounts and email

Passwords are hashed by Better Auth. Production registration requires email verification; password reset also uses email. The first signup never becomes an administrator automatically.

After the owner has registered and verified an email, grant the first administrator role through the protected bootstrap command. Further admins and contributors are managed inside the administrator panel. The server prevents removal of the last administrator.

## Content and tests

Content records and test questions are stored transactionally in PostgreSQL. Test questions remain embedded in their parent test and never appear as separate catalog items. Starting a test saves a question snapshot, so later editor changes do not alter an attempt already in progress. Answers auto-save; the server owns deadlines and grading.

Uploaded PDFs and images remain private. The backend checks account access before serving them. Deleting content removes its related notes, attempts, file records, and stored objects in a controlled transaction plus storage cleanup.

## Data protection

Use several independent recovery layers:

1. Railway daily, weekly, and monthly database volume backups.
2. PostgreSQL point-in-time recovery when enabled.
3. Daily portable `pg_dump` files written by `ops/postgres-backup` to a separate private backup bucket.
4. A regular encrypted copy downloaded outside Railway.
5. A restore drill into a staging database before public launch and after material schema changes.
6. The permanent `BETTER_AUTH_SECRET` stored in a password manager separately from Railway.

A backup is accepted only after a restore test confirms accounts, content counts, attempts, and uploaded files. Never wipe a Railway volume as cleanup; Railway documents that wiping a volume also deletes its native backups.

Local `npm run backup` makes a consistent SQLite snapshot with uploads, the authentication secret, and a manifest under ignored `backups/`.

## AI controls

The OpenAI key belongs only in Railway. Requests use `store:false`, bounded input/output, per-minute and daily account limits, and a platform-wide daily limit. The interface states that AI can make mistakes. AI is never used as authoritative test grading.

Set an OpenAI project budget and usage alerts in the OpenAI dashboard. Do not send the API key through chat.

## Verification before launch

Run the type check, backend integration suite, and production frontend build. Then verify against staging:

- Registration, verification email, login, logout, and password reset.
- Student, contributor, and multiple-admin permissions.
- Draft, approval, publish, edit, archive, and delete.
- PDF upload/read/download and image upload/display.
- Timed test autosave, refresh recovery, deadline submission, grading, review, and best score.
- Uzbek, Russian, and English interface text; light and dark themes; mobile layout.
- OpenAI limits and failure messages.
- PostgreSQL snapshot, portable dump, full restore, and object recovery.
- Health monitoring, billing alerts, and hard usage limits.

Production is connected to the domain only after staging passes.
