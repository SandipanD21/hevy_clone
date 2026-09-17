"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Exercise } from "@/lib/types";

// Search/filter runs client-side against the already-fetched list — simplest
// option for a list this size (a few hundred rows at most), and it avoids a
// network round-trip per keystroke.
export function ExerciseList({ exercises }: { exercises: Exercise[] }) {
  const [search, setSearch] = useState("");
  const [muscleGroup, setMuscleGroup] = useState("all");

  const muscleGroups = useMemo(() => {
    const groups = new Set(
      exercises.map((e) => e.muscle_group).filter((g): g is string => !!g)
    );
    return ["all", ...Array.from(groups).sort()];
  }, [exercises]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return exercises.filter((exercise) => {
      const matchesSearch =
        query === "" || exercise.name.toLowerCase().includes(query);
      const matchesGroup =
        muscleGroup === "all" || exercise.muscle_group === muscleGroup;
      return matchesSearch && matchesGroup;
    });
  }, [exercises, search, muscleGroup]);

  return (
    /*
      min-h-0 is the load-bearing class here: without it a flex child refuses
      to shrink below its content height, the panel grows past the viewport,
      and the whole page scrolls instead of the list.
    */
    <section className="card flex min-h-0 flex-1 flex-col overflow-hidden">
      {/* Controls stay pinned while the list scrolls under them. */}
      <div className="flex shrink-0 flex-col gap-2 border-b border-line p-3 sm:flex-row">
        <div className="relative flex-1">
          <Search
            size={16}
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-ink-subtle"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search exercises"
            aria-label="Search exercises"
            className="field-input pl-9"
          />
        </div>
        <select
          value={muscleGroup}
          onChange={(e) => setMuscleGroup(e.target.value)}
          aria-label="Filter by muscle group"
          className="field-input sm:w-48"
        >
          {muscleGroups.map((group) => (
            <option key={group} value={group}>
              {group === "all" ? "All muscle groups" : group}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-1 items-center justify-center p-10 text-center">
          <p className="text-sm text-ink-subtle">
            No exercises match that search.
          </p>
        </div>
      ) : (
        <ul className="min-h-0 flex-1 divide-y divide-line overflow-y-auto">
          {filtered.map((exercise) => (
            <li
              key={exercise.id}
              className="flex items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-canvas"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink">
                  {exercise.name}
                </p>
                <p className="mt-0.5 truncate text-xs text-ink-subtle">
                  {[exercise.muscle_group, exercise.equipment]
                    .filter(Boolean)
                    .join(" · ") || "—"}
                </p>
              </div>
              {exercise.is_custom && (
                <span className="shrink-0 rounded-md border border-line bg-canvas px-2 py-0.5 text-[11px] font-medium text-ink-muted">
                  Custom
                </span>
              )}
            </li>
          ))}
        </ul>
      )}

      <div className="shrink-0 border-t border-line px-4 py-2 text-xs text-ink-subtle">
        Showing {filtered.length} of {exercises.length}
      </div>
    </section>
  );
}
