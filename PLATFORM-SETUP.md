# Math Olympiad Uz — current setup

The project lives on the Desktop in `math-olympiad`. Nothing is deployed online yet.

## What works locally

- Registration and login with hashed passwords and database-backed sessions.
- Public catalogs; full problems, resources, test questions and file downloads require an account.
- Students have private math notes and saved practice-test results.
- Contributors create their own problems, tests, topics, articles and books, then submit for review.
- Admins manage content, approve or return submissions, archive content, and assign roles.
- Formula editor with a math keyboard, LaTeX, inline/display equations and previews.
- Home totals count registered accounts and published material in the database. Draft and archived content is excluded. Sample educational material is seeded once; it is real editable content, not fabricated user activity.
- Timed practice tests save answers automatically. The server grades numeric answers against a snapshot; written proofs are saved without automatic grading. After the deadline only previously saved answers count. These are practice tests, not a supervised competition system.
- Uzbek learning content with Uzbek/Russian/English interface and light/dark mode.
- AI route is prepared, but disabled until an OpenAI API key is configured. No AI purchase or request has been made.

## Start and stop

`npm run dev` starts the frontend at http://127.0.0.1:3000 and backend at http://127.0.0.1:4000.
Do not run a second copy if they are already running. The preview can run through Codex without an open Terminal window; the Mac must remain awake. Closing a Terminal window is different from stopping its server process. After a restart or sleep, ask Codex to check and restart the preview if necessary.

`npm run typecheck` checks types. `npm run test:backend` runs the security/workflow tests in a temporary, automatically removed database. Stop the frontend development server before `npm run build` because both use `.next`. The backend can stay running.

## Your admin account

Register your own account in the local website. Then ask Codex to make that account the initial admin, giving only the email address. Do not share your password.
The explicit administrator bootstrap command is `npm run admin -- your-email@example.com`. Only someone with access to the project/server can use it. The first public signup is never automatically an admin. Future role changes happen in the admin panel.

Local email verification is disabled until SMTP is connected. The UI says this explicitly. Production refuses to start without HTTPS, a private auth secret and SMTP settings. Configure email verification and reset delivery and test them before publication.

## Vercel + Railway plan

**Vercel** runs the Next.js frontend. Set `BACKEND_URL` to the Railway HTTPS service URL, and `PUBLIC_APP_URL` to the exact public website origin (no trailing slash). `/api/*` is proxied to Railway so login uses the website's own cookies. Backend requests are not cached. Vercel Hobby is free for personal/non-commercial use; reassess the plan before introducing commercial use. Do not connect preview deployments to the production backend by default.

**Railway** runs one Express backend instance using `Dockerfile` and `railway.json`. It keeps the SQLite database and uploads on a **persistent volume mounted at `/data`**, with `DATA_DIR=/data`. Do not deploy without this volume. SQLite and uploads must never be put on Vercel's temporary filesystem. Railway provides `PORT`; the backend listens on all interfaces in production. `/health` is the healthcheck.

Backend variables: `PUBLIC_APP_URL`, `DATA_DIR`, a unique random `BETTER_AUTH_SECRET` of at least 32 characters, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `EMAIL_FROM`. Add optional OpenAI variables privately on Railway. Keep secrets out of GitHub, screenshots and chat. `.env.example` contains names and safe defaults only.

Railway has a $5/month minimum with usage beyond the included credit billed separately. Frontend hosting elsewhere may reduce usage; it does not eliminate Railway's minimum. Confirm the actual account plans and estimated usage before deploying. No hosting accounts, GitHub repo, domain routing, SMTP service or paid subscription have been configured.

A single backend and SQLite database fit the initial budget. Do not enable multiple replicas against this file database. If traffic grows enough to need multiple backend instances, plan a database migration first.

## AI configuration

Set `OPENAI_API_KEY` only in the backend's private environment. Default model is `gpt-5-mini`, configurable through `OPENAI_MODEL`. Default limits are 10 requests per account/day and 100 total/day, plus 3 per minute. Input and output size are limited. These are request limits, not a guaranteed dollar spending cap; also set an OpenAI project budget/alerts and monitor usage. The UI explains that question text goes to OpenAI. Conversations are not stored by our database and requests use `store:false`.

Hints mode asks for a hint and guiding question; full-solution mode asks for a complete explanation. AI answers can be wrong and are not used as authoritative grading.

## Data and backups

`data/platform.sqlite` stores accounts, content, notes, attempts, file records, rate-limit counters and an audit trail. `data/uploads` holds private PDFs/images. Local auth signing secret is generated once in `data/.auth-secret`. Never delete this folder as a routine cleanup, commit it, or make it public.

Run `npm run backup` for a consistent SQLite backup plus uploaded files in `backups/<timestamp>`. Store an encrypted copy outside the host before launching. Back up the auth secret separately in a password manager or secure host settings. Restoring with a new secret signs users out. Railway volume backups and offsite retention still need to be configured in the real account; a backup command alone is not an automated backup service.

Before publishing: verify production HTTPS login/logout, email verification and reset, admin roles, private files, restore a backup in a test environment, review privacy/terms and competition rules, and check hosting/AI billing limits. Local integration tests, the production build, and browser checks for sign-in, saving a draft, submitting a test, viewing its saved result and logout passed; actual Vercel/Railway deployment and external email/AI remain untested until those accounts are connected.

Deployment note: Better Auth currently falls back to a shared per-path login/signup rate-limit bucket when a trustworthy client IP is unavailable through the proxy. Before public launch, configure and test the Vercel/Railway client-IP trust chain; do not blindly trust client-supplied forwarded headers. The local test does not establish that production proxy configuration.
