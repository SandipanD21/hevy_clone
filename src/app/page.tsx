import Link from "next/link";

const SCREENS = [
  {
    href: "/exercises",
    title: "Exercise library",
    phase: "Live",
    description: "Browse the built-in exercise list and add your own custom exercises.",
  },
  {
    href: "/routines",
    title: "Routines",
    phase: "Phase 2",
    description: "Build reusable templates like “Push Day” to start workouts from.",
  },
  {
    href: "/workout",
    title: "Active workout",
    phase: "Phase 3",
    description: "Log sets — weight × reps — for each exercise in a session.",
  },
  {
    href: "/history",
    title: "History & progress",
    phase: "Phase 4",
    description: "Review past workouts and see weight/reps trends per exercise.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Welcome to your workout tracker
        </h1>
        <p className="mt-2 max-w-xl text-zinc-600">
          Sign-in and the exercise library are live. The rest are stubs —
          built out in order from the roadmap in your{" "}
          <span className="font-medium">Hevy Clone — Build Plan</span> doc.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {SCREENS.map((screen) => (
          <Link
            key={screen.href}
            href={screen.href}
            className="rounded-lg border border-zinc-200 bg-white p-5 transition hover:border-zinc-400"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-medium">{screen.title}</h2>
              <span className="text-xs text-zinc-400">{screen.phase}</span>
            </div>
            <p className="mt-1 text-sm text-zinc-600">{screen.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
