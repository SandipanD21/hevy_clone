import { Hammer } from "lucide-react";

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
    <div className="flex h-full items-center justify-center">
      <div className="card max-w-md p-6 text-center">
        <span className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-canvas text-ink-subtle">
          <Hammer size={18} aria-hidden="true" />
        </span>
        <span className="text-[11px] font-medium tracking-wide text-ink-subtle uppercase">
          {phase} — not built yet
        </span>
        <h1 className="mt-1.5 text-base font-semibold tracking-tight">
          {title}
        </h1>
        <p className="mt-2 text-sm text-ink-muted">{description}</p>
        <p className="mt-4 border-t border-line pt-4 text-xs text-ink-subtle">
          <span className="font-medium text-ink-muted">Next step: </span>
          {nextStep}
        </p>
      </div>
    </div>
  );
}
