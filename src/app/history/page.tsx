import { PhaseStub } from "@/components/PhaseStub";

export default function HistoryPage() {
  return (
    <PhaseStub
      title="History & progress"
      phase="Phase 4"
      description="Browse past workouts, open one for full detail, and see a weight/reps trend chart plus personal bests for a given exercise."
      nextStep="Query workouts ordered by started_at for the list; join sets through workout_exercises for the per-exercise chart (Recharts)."
    />
  );
}
