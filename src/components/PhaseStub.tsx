export function PhaseStub({
  title,
  phase,
  description,
  nextStep,
}: {
  title: string;
  phase: string;
  description: string;
  nextStep: string;
}) {
  return (
    <div className="rounded-lg border border-dashed border-zinc-300 bg-white p-8">
      <span className="text-xs font-medium uppercase tracking-wide text-zinc-400">
        {phase} — not built yet
      </span>
      <h1 className="mt-2 text-xl font-semibold">{title}</h1>
      <p className="mt-2 text-zinc-600">{description}</p>
      <p className="mt-4 text-sm text-zinc-500">
        <span className="font-medium text-zinc-700">Next step: </span>
        {nextStep}
      </p>
    </div>
  );
}
