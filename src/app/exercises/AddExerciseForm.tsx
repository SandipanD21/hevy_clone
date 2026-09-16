"use client";

import { useActionState, useRef, useState } from "react";
import { addExercise, type AddExerciseState } from "./actions";

const initialState: AddExerciseState = null;

export function AddExerciseForm() {
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Wrap the server action so we can reset/close the form on success —
  // addExercise itself just returns null when there's nothing to report.
  const [state, formAction, pending] = useActionState(
    async (prevState: AddExerciseState, formData: FormData) => {
      const result = await addExercise(prevState, formData);
      if (!result) {
        formRef.current?.reset();
        setOpen(false);
      }
      return result;
    },
    initialState
  );

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="self-start rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-100"
      >
        + Add custom exercise
      </button>
    );
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-4 sm:flex-row sm:items-end sm:flex-wrap"
    >
      <div className="flex-1 min-w-[10rem]">
        <label
          htmlFor="name"
          className="block text-xs font-medium text-zinc-700"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
        />
      </div>
      <div className="flex-1 min-w-[10rem]">
        <label
          htmlFor="muscle_group"
          className="block text-xs font-medium text-zinc-700"
        >
          Muscle group
        </label>
        <input
          id="muscle_group"
          name="muscle_group"
          className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
        />
      </div>
      <div className="flex-1 min-w-[10rem]">
        <label
          htmlFor="equipment"
          className="block text-xs font-medium text-zinc-700"
        >
          Equipment
        </label>
        <input
          id="equipment"
          name="equipment"
          className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {pending ? "Adding…" : "Add"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-md px-3 py-2 text-sm text-zinc-500 hover:text-zinc-900"
        >
          Cancel
        </button>
      </div>
      {state?.error && (
        <p className="w-full text-sm text-red-600">{state.error}</p>
      )}
    </form>
  );
}
