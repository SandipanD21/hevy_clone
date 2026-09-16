import { PhaseStub } from "@/components/PhaseStub";

export default function RoutinesPage() {
  return (
    <PhaseStub
      title="Routines"
      phase="Phase 2"
      description="Create and edit reusable workout templates: pick exercises, set their order, and set default target sets."
      nextStep="Build a form that inserts into routines and routine_exercises, then list the user's saved routines."
    />
  );
}
