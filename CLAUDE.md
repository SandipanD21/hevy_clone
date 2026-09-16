# Hevy Clone — project context

A personal web app that clones the core of Hevy (gym workout tracker):
logging workouts, weight/reps per set, reusable routines, and per-exercise
progress over time. Built by someone new to web dev but comfortable with
some code — prefer clear, well-commented code over cleverness, and explain
*why*, not just *what*, when making non-obvious choices.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Supabase: Postgres database + Auth (see `src/lib/supabase/`)
- Hosting: Vercel (frontend) + Supabase (data), both free tier
- Charts: Recharts (for exercise progress, not yet added)

Full rationale for these choices lives in the "Hevy Clone — Build Plan" doc
in the user's Claude project (not in this repo) — ask if you need the "why"
behind a stack decision that isn't explained inline.

## Data model

Six tables in `supabase/schema.sql` (run it in the Supabase SQL editor,
then `supabase/seed_exercises.sql` for starter data):

- `exercises` — the library (built-in + user's custom ones)
- `routines` / `routine_exercises` — saved templates
- `workouts` / `workout_exercises` / `sets` — logged sessions; `sets` is
  where weight and reps actually live

All tables have Row Level Security scoped to `auth.uid()`.

## Roadmap / current status

- [x] **Phase 0 — Setup**: Next.js + Tailwind + Supabase wired up, schema
      written, deploy pipeline documented in `SETUP.md`. Placeholder pages
      exist for all four MVP screens.
- [x] **Phase 1 — Auth + data**: real sign-in (email/password via
      Supabase Auth, route-protected by `proxy.ts`), exercises render on
      `/exercises` with search/filter, custom exercises can be added.
- [ ] **Phase 2 — Routines**: CRUD for routine templates.
- [ ] **Phase 3 — Logging a workout**: the core loop — start from a
      routine, log sets, finish. This is the heart of the app.
- [ ] **Phase 4 — History + progress**: past-workouts list, exercise detail
      page with a weight/reps trend chart.
- [ ] **Phase 5 — Polish**: rest timer, PWA install support, mobile pass,
      personal-record badges.

Deferred past v1: social feed/following, body measurements, progress
photos, advanced analytics (1RM estimates, volume charts), native mobile
app.

## Working conventions

- Build one phase at a time, in order — each should be a working,
  testable slice, not a partial feature.
- The user is learning as we go: prefer walking through *why* a piece of
  code works before writing the next piece, especially for new concepts
  (Server vs Client Components, RLS, etc.).
- `npm run build` and `npm run lint` should stay clean before calling a
  phase done.
