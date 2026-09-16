import { PhaseStub } from "@/components/PhaseStub";

export default function WorkoutPage() {
  return (
    <PhaseStub
      title="Active workout"
      phase="Phase 3"
      description="Start a workout from a routine (or blank), log each set's weight and reps as you lift, and save when finished. This is the core of the app."
      nextStep="Create a workouts row on start, then insert workout_exercises and sets as the user logs each set."
    />
  );
}
