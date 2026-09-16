"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type AddExerciseState = { error: string } | null;

export async function addExercise(
  _prevState: AddExerciseState,
  formData: FormData
): Promise<AddExerciseState> {
  const name = (formData.get("name") as string)?.trim();
  const muscleGroup = (formData.get("muscle_group") as string)?.trim() || null;
  const equipment = (formData.get("equipment") as string)?.trim() || null;

  if (!name) {
    return { error: "Name is required." };
  }

  const supabase = await createClient();

  // Server Actions are reachable directly (not just through this form), so
  // re-check who's signed in here rather than trusting the client.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be signed in to add an exercise." };
  }

  const { error } = await supabase.from("exercises").insert({
    name,
    muscle_group: muscleGroup,
    equipment,
    is_custom: true,
    created_by: user.id,
  });

  if (error) {
    return { error: error.message };
  }

  // Re-fetch the exercises list on the server so the new one shows up.
  revalidatePath("/exercises");
  return null;
}
