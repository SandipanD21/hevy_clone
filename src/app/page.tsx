import Link from "next/link";
import {
  ArrowRight,
  ClipboardList,
  Dumbbell,
  History,
  Play,
  type LucideIcon,
} from "lucide-react";

const SCREENS: {
  href: string;
  title: string;
  status: string;
  description: string;
  icon: LucideIcon;
  ready: boolean;
}[] = [
  {
    href: "/exercises",
    title: "Exercise library",
    status: "Ready",
    description: "Browse built-in exercises and add your own.",
    icon: Dumbbell,
    ready: true,
  },
  {
    href: "/routines",
    title: "Routines",
    status: "Phase 2",
    description: "Reusable templates like “Push Day” to start workouts from.",
    icon: ClipboardList,
    ready: false,
  },
  {
    href: "/workout",
    title: "Active workout",
    status: "Phase 3",
    description: "Log sets — weight × reps — for each exercise in a session.",
    icon: Play,
    ready: false,
  },
  {
    href: "/history",
    title: "History & progress",
    status: "Phase 4",
    description: "Review past workouts and weight/reps trends per exercise.",
    icon: History,
    ready: false,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">
          Your workout tracker
        </h1>
        <p className="mt-1.5 text-sm text-ink-muted">
          Sign-in and the exercise library are live. The rest arrive phase by
          phase.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {SCREENS.map(({ href, title, status, description, icon: Icon, ready }) => (
          <Link
            key={href}
            href={href}
            className="card group p-4 transition-colors hover:border-line-strong"
          >
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-canvas text-ink-muted">
                <Icon size={18} aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="truncate text-sm font-medium text-ink">
                    {title}
                  </h2>
                  <span
                    className={`shrink-0 rounded-md px-1.5 py-0.5 text-[11px] font-medium ${
                      ready
                        ? "bg-success/10 text-success"
                        : "bg-canvas text-ink-subtle"
                    }`}
                  >
                    {status}
                  </span>
                </div>
                <p className="mt-1 text-xs text-ink-subtle">{description}</p>
              </div>
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-ink-subtle transition-transform group-hover:translate-x-0.5"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
