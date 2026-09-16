-- Hevy Clone — database schema
-- Run this once in your Supabase project's SQL Editor (Project -> SQL Editor -> New query).
-- Mirrors the data model in the "Hevy Clone — Build Plan" doc: exercises,
-- routines (templates), and workouts (logged sessions) built from sets.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- exercises: the library you pick from. Built-ins have created_by = null and
-- is_custom = false; a user's own additions have created_by = their user id.
-- ---------------------------------------------------------------------------
create table if not exists exercises (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  muscle_group text,
  equipment text,
  is_custom boolean not null default false,
  created_by uuid references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- routines: a saved workout template, e.g. "Push Day".
-- ---------------------------------------------------------------------------
create table if not exists routines (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  notes text,
  created_at timestamptz not null default now()
);

-- routine_exercises: which exercises are in a routine, and in what order.
create table if not exists routine_exercises (
  id uuid primary key default gen_random_uuid(),
  routine_id uuid not null references routines (id) on delete cascade,
  exercise_id uuid not null references exercises (id) on delete restrict,
  position int not null default 0,
  target_sets int,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- workouts: one logged session. Can start from a routine or be freeform.
-- ---------------------------------------------------------------------------
create table if not exists workouts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  routine_id uuid references routines (id) on delete set null,
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  notes text
);

-- workout_exercises: which exercises were actually done in a session.
create table if not exists workout_exercises (
  id uuid primary key default gen_random_uuid(),
  workout_id uuid not null references workouts (id) on delete cascade,
  exercise_id uuid not null references exercises (id) on delete restrict,
  position int not null default 0
);

-- sets: each individual set — this is where weight and reps live.
create table if not exists sets (
  id uuid primary key default gen_random_uuid(),
  workout_exercise_id uuid not null references workout_exercises (id) on delete cascade,
  set_number int not null,
  weight numeric(6, 2),
  reps int,
  is_warmup boolean not null default false,
  completed_at timestamptz not null default now()
);

-- Helpful indexes for the queries the app will run most (history + progress).
create index if not exists idx_routines_user on routines (user_id);
create index if not exists idx_workouts_user on workouts (user_id, started_at desc);
create index if not exists idx_routine_exercises_routine on routine_exercises (routine_id);
create index if not exists idx_workout_exercises_workout on workout_exercises (workout_id);
create index if not exists idx_workout_exercises_exercise on workout_exercises (exercise_id);
create index if not exists idx_sets_workout_exercise on sets (workout_exercise_id);

-- ---------------------------------------------------------------------------
-- Row Level Security: every user can only see and change their own data.
-- Built-in exercises (is_custom = false) are readable by everyone.
-- ---------------------------------------------------------------------------
alter table exercises enable row level security;
alter table routines enable row level security;
alter table routine_exercises enable row level security;
alter table workouts enable row level security;
alter table workout_exercises enable row level security;
alter table sets enable row level security;

-- exercises: read built-ins + your own custom ones; only insert/edit/delete your own.
create policy "exercises_select" on exercises
  for select using (is_custom = false or created_by = auth.uid());

create policy "exercises_insert" on exercises
  for insert with check (created_by = auth.uid() and is_custom = true);

create policy "exercises_update" on exercises
  for update using (created_by = auth.uid());

create policy "exercises_delete" on exercises
  for delete using (created_by = auth.uid());

-- routines: fully owned by the user.
create policy "routines_all" on routines
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- routine_exercises: ownership follows the parent routine.
create policy "routine_exercises_all" on routine_exercises
  for all using (
    exists (select 1 from routines r where r.id = routine_id and r.user_id = auth.uid())
  ) with check (
    exists (select 1 from routines r where r.id = routine_id and r.user_id = auth.uid())
  );

-- workouts: fully owned by the user.
create policy "workouts_all" on workouts
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- workout_exercises: ownership follows the parent workout.
create policy "workout_exercises_all" on workout_exercises
  for all using (
    exists (select 1 from workouts w where w.id = workout_id and w.user_id = auth.uid())
  ) with check (
    exists (select 1 from workouts w where w.id = workout_id and w.user_id = auth.uid())
  );

-- sets: ownership follows workout_exercises -> workouts.
create policy "sets_all" on sets
  for all using (
    exists (
      select 1 from workout_exercises we
      join workouts w on w.id = we.workout_id
      where we.id = workout_exercise_id and w.user_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from workout_exercises we
      join workouts w on w.id = we.workout_id
      where we.id = workout_exercise_id and w.user_id = auth.uid()
    )
  );
