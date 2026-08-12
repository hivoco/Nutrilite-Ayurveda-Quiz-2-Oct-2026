# AGENTS.md

Working notes for AI agents on this repo. See `README.md` for the user-facing overview.

## What this is

A mobile-first Next.js quiz app for Amway Nutrilite Ayurveda events. Participants register a name, answer a timed MCQ quiz, and see a result plus a per-session leaderboard. Staff create event "sessions" (rooms) and share a link.

Stack: Next.js 15 **Pages Router** (not App Router), React 19, Tailwind CSS v4, MySQL via `mysql2`. Plain JavaScript — no TypeScript.

## Layout of the code

```
src/pages/           routes (Pages Router) + /api handlers
src/components/      shared UI — Layout, Timer, Options, Loading, SplashScreen, ProgressBar
src/context/         MusicContext (background audio), SessionContext
src/hooks/           voice recording / speech recognition (currently unused by the live flow)
src/lib/db.js        mysql2 pool + query() that lazily ensures the schema
src/lib/initDb.js    schema DDL and the seeded QUESTIONS array
src/styles/globals.css   Tailwind v4 entry and the @theme design tokens
public/bg, public/logos, public/images, public/music   assets
```

## Conventions that matter

- **Use the design tokens, not raw hex.** `--color-primary` (`#007B48`) and friends are declared in `src/styles/globals.css` under `@theme inline`; write `text-primary` / `bg-primary` / `border-primary`. Raw `bg-[#007B48]`-style classes are the thing being migrated away from. The one legitimate exception is `<meta name="theme-color">` in `_app.js`, which cannot read a CSS variable.
- **Tailwind v4 has no `tailwind.config.js`.** Tokens and variants live in CSS. A custom `tall` variant (`@media (min-height: 700px)`) exists for taller phones.
- **Backgrounds go through `Layout`.** Pass `bgImage`, and optionally `topImage` / `bottomImage` for the decorative leaf strips, rather than setting a background on the page itself. `/bg/bg.png` is the photographic background; `/bg/bg-2.jpg` is the cream texture.
- **Contrast follows the background.** Cream background → green (`text-primary`) controls. Photo background → white controls. The home page switches both the background and the control colors on `showRegister`, and `Layout` swaps the Hivoco logo variant to match.
- **Sizing is viewport-relative.** Screens are `h-svh` with no page scroll, so use `vh` units and `max-h-[Nvh]` caps on fixed-pixel images. A fixed `px` height that fits a tall phone will push the submit button off a short one.
- **The correct answer never reaches the client.** `/api/get_all_question` omits it; `/api/verify` grades server-side. Keep it that way.
- **Identity lives in `sessionStorage`** (`name`, `userId`, `session`), and the session also travels in the URL as `?session=<name>`. There is no auth.

## Database behaviour

`query()` in `src/lib/db.js` awaits `ensureSchema()` once per process: it creates the database if missing, creates `questions` / `users` / `sessions` / `quiz_results`, and seeds questions only when the `nfsu` set is empty. So a fresh clone with valid credentials needs no migration step.

To change the question set, edit `QUESTIONS` in `src/lib/initDb.js`, then run `node reseed.mjs` (deletes and re-inserts `type = 'nfsu'`). `node check.mjs` verifies connectivity and row counts. `POST /api/setup` does the same reseed over HTTP.

Questions are keyed by `lang` (default `english`) and `type` (default `nfsu`), which is how alternate question banks are kept apart.

## Verifying changes

- `npm run lint` for ESLint.
- `npm run dev` and check on a narrow viewport — this is a phone app; desktop width proves little. Both the landing and the `showRegister` state need checking, and short viewports (≈630px tall) are where layout bugs show up first.
- Nothing here has automated tests.

## Gotchas

- `npm start` serves on **port 6007**, `npm run dev` on 3000.
- `src/pages/iosquiz/index.js` and `src/pages/register/index.js` are largely commented-out older variants of the quiz and registration screens. The live flow is `index.js` → `quiz/index.js` → `result/index.js`. Don't assume edits there have any effect.
- API error handlers deliberately echo the MySQL `code` and `message` in the 500 response — that is intentional for debugging this internal event tool, not an oversight to "fix".
- Background music autoplays via `MusicContext` and is enabled by the first tap on the landing arrow (browsers block audio before a user gesture).
