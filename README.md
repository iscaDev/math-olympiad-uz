# Math Olympiad Uz

Math Olympiad Uz is a multilingual mathematics learning platform built with Next.js, React, TypeScript, Tailwind CSS, an Express API, Better Auth, PostgreSQL, and private S3-compatible object storage.

The application includes:

- Public problem, test, book, article, and lesson catalogs.
- Registered student access to full content, notes, timed tests, saved answers, automatic grading, review, and best-result tracking.
- Contributor workflows for writing mathematical content and submitting it for approval.
- Administrator publishing, editing, deletion, role management, and multiple-admin support.
- Formula editing, LaTeX rendering, image attachments, PDF reading, Uzbek/Russian/English interface text, and light/dark themes.
- An optional OpenAI tutor that gives hints first and full solutions on request.

## Local preview

The working directory is `~/Desktop/math-olympiad`.

```sh
npm install
npm run build
npm run preview
```

Open http://127.0.0.1:3000. Local development uses SQLite and local private uploads so the preview remains easy to run. Production refuses to start without PostgreSQL, HTTPS, email delivery, an authentication secret, and private object storage.

Useful checks:

```sh
npm run typecheck
npm run test:backend
npm run backup
```

Local data, uploaded files, backups, environment files, build output, and secrets are ignored by Git and must never be committed.

## Production architecture

- **Vercel:** Next.js frontend and same-origin `/api` proxy.
- **Railway backend:** Express API, authentication, grading, access control, and OpenAI calls.
- **Railway PostgreSQL:** accounts, roles, content, notes, attempts, results, audit records, and rate limits.
- **Railway private bucket:** uploaded PDFs, covers, and question images.
- **Separate private backup bucket:** portable daily PostgreSQL dumps.
- **Railway backups:** database volume snapshots and point-in-time recovery when enabled.

See [DEPLOYMENT.md](./DEPLOYMENT.md) for the controlled launch sequence and [PLATFORM-SETUP.md](./PLATFORM-SETUP.md) for operational details.
