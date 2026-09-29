# Math Olympiad Uz

An original Uzbek-language, interactive frontend prototype. The working project is on the Desktop in `math-olympiad`.

## Open the local preview

```sh
npm install
npm run dev
```

Open http://127.0.0.1:3000/. Stop with Control+C. The development command uses Webpack polling so edits are reliably picked up on this Mac.

## Explore

- **Home** — original mathematical artwork, a short number-pattern question, four subject paths, featured problems and an animated visual proof.
- **Problems** — 12 examples across algebra, geometry, number theory and combinatorics. Search, subject and difficulty filters, and sorting work locally.
- **Problem pages** — 12 individual pages, including `/problems/sample/`. Each includes two hints, a worked solution and temporary notes. Ten problems have numeric answer checks; two are proof exercises.
- **Learn** — four short lessons, each with examples, a retryable quiz and a related problem.
- **Tests & Contests** — four clearly labelled sample formats with filters and expandable details. Participation is disabled.
- **About** — purpose, principles, current scope and FAQs.

## Scope

Next.js, React, TypeScript and Tailwind CSS. Manrope is self-hosted; Phosphor provides icons, KaTeX renders formulas, and Motion handles subtle reveals. The homepage art was generated specifically for this project. There are no runtime external service calls, accounts, backend, database, AI integration, payments, saved results or real contests. Reloading clears temporary learning input. Language and theme preferences are remembered on this browser using localStorage. Uzbek and light mode are the defaults. Russian and English translate the interface; problem statements, worked solutions and lesson content stay in Uzbek. The login/register dialog is a disabled visual preview and collects no information.

`npm run build` exports static pages to `out/`. Nothing is published automatically. Stop the development server before building because both commands use `.next`.

```sh
npm run build
npm run typecheck
```

## Edit later

- `lib/content.ts`: problems and lessons (Uzbek)
- `lib/translations.ts`: Russian and English interface translations
- `components/preferences.tsx`: browser-local language and theme preferences
- `app/`: pages and shared styles
- `components/`: interactive features and shared UI
- `public/brand/matholympiad-logo.png`: official user-supplied logo; reuse for future branding
- `components/brand-mark.tsx`: shared logo display for header and footer
- `public/art/`: original homepage illustration
- `DESIGN_NOTES.md`: research and design decisions
- `DESIGN_QA.md`: validation record
