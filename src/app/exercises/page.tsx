import { PhaseStub } from "@/components/PhaseStub";

export default function ExercisesPage() {
  return (
    <PhaseStub
      title="Exercise library"
      phase="Phase 1"
      description="Browse the ~40 built-in exercises seeded from supabase/seed_exercises.sql, search/filter by muscle group, and add your own custom exercises."
      nextStep="Query the exercises table with the Supabase client and render the list — see SETUP.md for how to connect."
    />
  );
}
