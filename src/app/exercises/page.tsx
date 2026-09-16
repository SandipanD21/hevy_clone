import { createClient } from "@/lib/supabase/server";
import { AddExerciseForm } from "./AddExerciseForm";
import { ExerciseList } from "./ExerciseList";

// Server Component: fetches exercises on the server (RLS scopes this to
// built-ins + the signed-in user's own custom ones) and hands the list to
// a Client Component for interactive search/filter.
export default async function ExercisesPage() {
  const supabase = await createClient();

  const { data: exercises, error } = await supabase
    .from("exercises")
    .select("id, name, muscle_group, equipment, is_custom, created_by, created_at")
    .order("muscle_group", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    return (
      <p className="text-sm text-red-600">
        Couldn&apos;t load exercises: {error.message}
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Exercise library
        </h1>
        <p className="mt-1 text-zinc-600">
          Browse the built-in exercises or add your own.
        </p>
      </div>

      <AddExerciseForm />

      <ExerciseList exercises={exercises ?? []} />
    </div>
  );
}
