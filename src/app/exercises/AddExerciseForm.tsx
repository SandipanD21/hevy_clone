"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Plus, X } from "lucide-react";
import { addExercise, type AddExerciseState } from "./actions";

const initialState: AddExerciseState = null;

export function AddExerciseForm() {
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Wrap the server action so we can reset and close the dialog on success —
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

  // Escape closes the dialog, like any other modal on the web.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="btn btn-secondary"
      >
        <Plus size={16} aria-hidden="true" />
        Add exercise
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-exercise-title"
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink/30 p-4 sm:items-center"
          onClick={(e) => {
            // Only a click on the backdrop itself closes — not one that
            // bubbled up from inside the panel.
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="card w-full max-w-md p-5 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2
                id="add-exercise-title"
                className="text-base font-semibold tracking-tight"
              >
                Add custom exercise
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="btn btn-ghost h-8 w-8 px-0"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>

            <form ref={formRef} action={formAction} className="flex flex-col gap-3">
              <div>
                <label htmlFor="name" className="field-label">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  autoFocus
                  placeholder="e.g. Cable Crossover"
                  className="field-input"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="muscle_group" className="field-label">
                    Muscle group
                  </label>
                  <input
                    id="muscle_group"
                    name="muscle_group"
                    placeholder="Chest"
                    className="field-input"
                  />
                </div>
                <div>
                  <label htmlFor="equipment" className="field-label">
                    Equipment
                  </label>
                  <input
                    id="equipment"
                    name="equipment"
                    placeholder="Cable"
                    className="field-input"
                  />
                </div>
              </div>

              {state?.error && (
                <p className="text-sm text-danger">{state.error}</p>
              )}

              <div className="mt-1 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={pending}
                  className="btn btn-primary"
                >
                  {pending ? "Adding…" : "Add exercise"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
