import { cache } from "react";
import { createClient } from "./server";

/**
 * The currently signed-in user, or null.
 *
 * Wrapped in React's `cache()` so that if several Server Components ask for
 * the user while rendering the same request (the header and the tab bar both
 * do), Supabase is only actually called once.
 */
export const getCurrentUser = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
});
