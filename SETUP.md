# Setup & deploy guide

This project is the Phase 0 scaffold from the "Hevy Clone — Build Plan" doc:
Next.js + TypeScript + Tailwind, a Supabase client wired up for auth and data,
a database schema matching the plan's data model, and placeholder pages for
the six MVP screens. Nothing here has real functionality yet — that's Phase 1
onward.

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com), sign up (free), and create a
   new project. Pick any name and a strong database password (save it
   somewhere — you won't need it day-to-day, but you'll want it if you ever
   need direct database access).
2. Wait a minute or two for the project to finish provisioning.

## 2. Create the database tables

1. In your Supabase project, open **SQL Editor** in the left sidebar.
2. Click **New query**, paste the entire contents of `supabase/schema.sql`,
   and click **Run**. This creates all six tables and their security rules.
3. New query again, paste `supabase/seed_exercises.sql`, and run it. This
   loads ~40 common exercises so the app isn't empty on day one.

## 3. Connect the app to your Supabase project

1. In Supabase, go to **Project Settings → API**.
2. Copy the **Project URL** and the **anon public** key.
3. In this project, copy `.env.local.example` to a new file named
   `.env.local`, and paste those two values in:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
   ```

   `.env.local` is already git-ignored, so these stay out of version control.

## 4. Run it locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you should see the
home page with cards for each of the four MVP screens.

## 5. Enable email sign-in (needed before Phase 1's auth work)

Supabase Auth is on by default with email/password. For local development,
Supabase's hosted email confirmation works out of the box — no extra setup
needed until you're ready to customize it (e.g. a custom email template),
which isn't required for the MVP.

## 6. Push to GitHub

```bash
git remote add origin https://github.com/<your-username>/hevy-clone.git
git branch -M main
git push -u origin main
```

(Create the empty repo on GitHub first if you haven't.)

## 7. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com), sign up with your GitHub account.
2. Click **Add New → Project**, and import the `hevy-clone` repo.
3. Before deploying, expand **Environment Variables** and add the same two
   keys from your `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Click **Deploy**. After a minute you'll get a live URL
   (e.g. `hevy-clone.vercel.app`).
5. Open that URL on your phone and add it to your home screen for quick
   access at the gym.

From now on, every `git push` to `main` auto-deploys the latest version —
no redeploy steps to remember.

## Where to go next

Follow the roadmap in the build plan doc: Phase 1 is auth + confirming the
seeded exercises show up on the `/exercises` page, then routines, then the
active-workout logging flow, then history and progress charts.
