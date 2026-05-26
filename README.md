# Amway Nutrilite Protein Quiz (NFSU)

A Next.js quiz application built for Amway's Nutrilite product training. Users register, take a multiple-choice quiz on Nutrilite All Plant Protein, Daily Plus, and Salmon Omega-3 products, and see their score on a leaderboard.

## Tech Stack

- **Framework:** Next.js 15 (Pages Router) + React 19
- **Styling:** Tailwind CSS v4
- **Database:** MySQL (via `mysql2`)
- **Icons:** lucide-react
- **Audio:** react-audio-voice-recorder

## Project Structure

```
src/
├── components/      # Layout, Header, Loading, Timer, ProgressBar, ProductImageSlider, etc.
├── context/         # React contexts (e.g. MusicContext)
├── hooks/           # Custom React hooks
├── lib/
│   ├── db.js        # MySQL connection pool
│   └── initDb.js    # Schema bootstrap + seed questions
├── pages/
│   ├── index.js                 # Splash + user registration
│   ├── quiz/                    # Main quiz flow
│   ├── iosquiz/                 # iOS-specific quiz variant
│   ├── result/                  # Score / result screen
│   ├── leaderboard/             # Top scorers
│   ├── register/                # Registration screen
│   ├── loading/                 # Loading screen
│   ├── admin/create-room/       # Admin session creation
│   └── api/                     # Backend endpoints
└── styles/
```

### API Endpoints

- `POST /api/create_session` — create a quiz session/room
- `GET /api/is_session_exit` — check whether a session exists
- `GET /api/is_user_exit` — check whether a username is taken within a session
- `GET /api/get_all_question` — fetch quiz questions
- `POST /api/insert_record` — submit quiz result
- `GET /api/get_top5` — leaderboard
- `POST /api/verify` — answer verification
- `GET /api/setup` — ensure DB schema / seed
- `GET /api/hello` — health check

## Database

Schema is created and seeded automatically by [src/lib/initDb.js](src/lib/initDb.js). Tables:

- `questions` — quiz items (15 seeded NFSU questions, English)
- `users` — registered participants (name, user_id, session_id)
- `sessions` — named quiz rooms
- `quiz_results` — submitted scores with JSON quiz data

## Environment

Create `.env.local` (or `.env`) with:

```
ORG_ID=...
MYSQL_HOST=...
MYSQL_USER=...
MYSQL_PASSWORD=...
MYSQL_DATABASE=...
```

## Getting Started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

The dev server runs on the default Next.js port (3000). Production `start` runs on port **6006**:

```bash
npm run build
npm run start    # serves on http://localhost:6006
```

## Utility Scripts

- `node reseed.mjs` — drop and re-seed all NFSU questions from [src/lib/initDb.js](src/lib/initDb.js)
- `node check.mjs` — print all NFSU questions currently in the DB
- `node export_results.js` — export `quiz_results` to a timestamped CSV (`results-<timestamp>.csv`) with `username,score,pass,created_at_ist` columns. Pass threshold is **75%**.

## Quiz Flow

1. User lands on splash screen, then registration.
2. If a `?session=<id>` is present in the URL, the name is checked for uniqueness within that session via `/api/is_user_exit`.
3. On submit, a `user_id` is generated client-side and stored in `sessionStorage`, then the user is routed to `/quiz`.
4. Questions are fetched, answered, and the final score is posted to `/api/insert_record`.
5. Result and leaderboard screens follow.

## Notes

- Dev origin `nfsu-nsts.thefirstimpression.ai` is whitelisted in [next.config.mjs](next.config.mjs).
- React strict mode is enabled.
- The seeded question set lives in [src/lib/initDb.js](src/lib/initDb.js) under the `QUESTIONS` array — edit there and run `node reseed.mjs` to refresh.
