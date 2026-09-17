import { createClient } from "@/lib/supabase/server";
import { AddExerciseForm } from "./AddExerciseForm";
import { ExerciseList } from "./ExerciseList";

// Server Component: fetches exercises on the server (RLS scopes this to
// built-ins + the signed-in user's own custom ones) and hands the list to a
// Client Component for interactive search/filter.
export default async function ExercisesPage() {
  const supabase = await createClient();

  const { data: exercises, error } = await supabase
    .from("exercises")
    .select("id, name, muscle_group, equipment, is_custom, created_by, created_at")
    .order("muscle_group", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    return (
      <div className="card p-4">
        <p className="text-sm text-danger">
          Couldn&apos;t load exercises: {error.message}
        </p>
      </div>
    );
  }

  return (
    // h-full + flex column so the list panel below can own the scrolling
    // instead of the page growing and scrolling as a whole.
    <div className="flex h-full flex-col gap-5">
      <div className="flex shrink-0 flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">
            Exercise library
          </h1>
          <p className="mt-1 text-sm text-ink-muted">
            Browse the built-in exercises or add your own.
          </p>
        </div>
        <AddExerciseForm />
      </div>

      <ExerciseList exercises={exercises ?? []} />
    </div>
  );
}
