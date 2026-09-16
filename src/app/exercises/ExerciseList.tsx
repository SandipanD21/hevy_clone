"use client";

import { useMemo, useState } from "react";
import type { Exercise } from "@/lib/types";

// Search/filter is done client-side against the already-fetched list —
// simplest option for a list this size (a few hundred rows at most), and
// avoids a network round-trip per keystroke.
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
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          placeholder="Search exercises…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-md border border-zinc-300 px-3 py-2 text-sm"
        />
        <select
          value={muscleGroup}
          onChange={(e) => setMuscleGroup(e.target.value)}
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm"
        >
          {muscleGroups.map((group) => (
            <option key={group} value={group}>
              {group === "all" ? "All muscle groups" : group}
            </option>
          ))}
        </select>
      </div>

      <p className="text-xs text-zinc-500">
        {filtered.length} of {exercises.length} exercises
      </p>

      {filtered.length === 0 ? (
        <p className="text-sm text-zinc-500">No exercises match.</p>
      ) : (
        <ul className="divide-y divide-zinc-200 rounded-lg border border-zinc-200 bg-white">
          {filtered.map((exercise) => (
            <li
              key={exercise.id}
              className="flex items-center justify-between px-4 py-3"
            >
              <div>
                <p className="font-medium">{exercise.name}</p>
                <p className="text-xs text-zinc-500">
                  {[exercise.muscle_group, exercise.equipment]
                    .filter(Boolean)
                    .join(" · ") || "—"}
                </p>
              </div>
              {exercise.is_custom && (
                <span className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                  Custom
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
