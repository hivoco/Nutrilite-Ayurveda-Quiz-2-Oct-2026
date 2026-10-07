# Nutrilite Ayurveda Quiz

A mobile-first quiz web app built for Amway Nutrilite Ayurveda product-knowledge events. A participant opens the app on a phone, registers a name, answers a timed multiple-choice quiz, and lands on a result screen with a leaderboard for their event session.

The current question set (Ayurveda Phase 2, "Quiz 2") is **10 questions** covering Tulsi, Brahmi and Ashwagandha, taken from `docs/Quiz questions_Ayurveda_Phase 2.docx`. Passing is 80% of the total, so 8/10.

Built with Next.js (Pages Router), React 19, Tailwind CSS v4, and MySQL.

## Quick start

```bash
npm install
# create .env.local with your MySQL credentials — see Environment below
npm run dev            # http://localhost:3000
```

The database schema is created automatically on the first API call that touches the DB (see [Database](#database)), so there is no separate migration step for a fresh install.

## Environment

Create a `.env.local` in the project root. There is no checked-in `.env.example` — the variables are listed here. The standalone scripts read `.env.local` first and fall back to `.env`.

| Variable | Purpose |
| --- | --- |
| `MYSQL_HOST` | MySQL server hostname |
| `MYSQL_USER` | MySQL user |
| `MYSQL_PASSWORD` | MySQL password |
| `MYSQL_DATABASE` | Database name — created automatically if missing |
| `ORG_ID` | Organisation identifier. Present in existing `.env.local` files but not read anywhere in the code today — safe to omit on a fresh setup |

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Next.js dev server on port 3000 |
| `npm run build` | Production build |
| `npm start` | Production server on **port 6025** |
| `npm run lint` | ESLint (`next lint`) |
| `node reseed.mjs` | Drop and re-seed the `nfsu` question set from `src/lib/initDb.js` |
| `node check.mjs` | Print row counts to confirm the DB is reachable and seeded |
| `node export_results.js` | Write `results-<timestamp>.csv` with username, score, and pass columns |

`scripts/reseed.mjs` is an older duplicate of the root `reseed.mjs` — both call `reseedAll()`, they only differ in how they parse the env file. Prefer the root one.

## How the app flows

1. **`/`** — Landing screen. A tap on the arrow reveals the registration state (`showRegister`): product shot, name input, and a submit arrow. If the URL carries `?session=<name>`, the entered name is checked for uniqueness within that session via `/api/is_user_exit` as you type (500 ms debounce).
2. **`/quiz`** — Loads questions from `/api/get_all_question`, one at a time, each on a 30-second timer. Every answer is graded server-side by `/api/verify` so the correct option never ships to the client. Name and generated `userId` come from `sessionStorage`.
3. On the last question the score is posted to `/api/insert_record` and the user is routed to **`/result`** with `score`, `total`, `session`, and `name` in the query string.
4. **`/leaderboard`** — Top five scores for the session (or just the participant's own result when there is no session), from `/api/get_top5`.
5. **`/admin/create-room`** — Staff screen that creates a session (a "room") and hands back a shareable `/?session=<name>` URL for participants.

Sessions are how one physical event is separated from another: participants who scan the same session link compete on the same leaderboard, and names must be unique inside it. Without a session, the app still works as a standalone quiz — name uniqueness is simply not enforced.

## API routes

| Route | Method | Purpose |
| --- | --- | --- |
| `/api/get_all_question` | GET | Questions for `lang` (default `english`) and `type` (default `nfsu`); never returns the correct answer |
| `/api/verify` | POST | Grades one answer, returns `is_correct` and `correct_option_value` |
| `/api/insert_record` | POST | Upserts the user and stores the finished quiz result |
| `/api/get_top5` | GET | Top five for a `session_id`, or a single participant's best by `name` |
| `/api/is_user_exit` | GET | Name-taken check within a session |
| `/api/is_session_exit` | GET | Session-name-taken check |
| `/api/create_session` | POST | Creates a session (room) |
| `/api/setup` | POST | Creates the database, tables, and re-seeds questions |

## Database

MySQL via a `mysql2` pool in `src/lib/db.js`. Every `query()` call first awaits `ensureSchema()` (once per process), which creates the database if missing, creates the four tables, and seeds the `nfsu` questions when the table is empty.

Tables: `questions`, `users`, `sessions`, `quiz_results`.

Questions are seeded from the `QUESTIONS` array in `src/lib/initDb.js` — edit that array and run `node reseed.mjs` to publish changes. `reseed.mjs` creates the database if it does not exist, so pointing `MYSQL_DATABASE` at a fresh name and running it is enough to stand up a new event database. Reseeding only touches rows with `type = 'nfsu'`; participants and results are left alone.

The number of questions is not fixed anywhere in the UI — the quiz, progress bar, and result screen all read `questions.length`, so changing the array length is the only step needed to change quiz length.

## Theming

Design tokens live in `src/styles/globals.css` under Tailwind v4's `@theme inline` block:

```css
--color-primary: #007B48;   /* brand green — use text-primary, bg-primary, border-primary */
--color-text-primary: #023400;
--color-dark-green: #04782B;
--color-black111: #111111;
```

Prefer the tokens over raw hex in class names so a palette change stays a one-line edit.

Backgrounds are passed to the shared `Layout` component: `/bg/bg.png` (photographic) and `/bg/bg-2.jpg` (cream texture), with `/images/quiz/leaves.png` as the decorative bottom strip. On cream backgrounds the UI uses the green token; on the photo background it switches to white for contrast.
