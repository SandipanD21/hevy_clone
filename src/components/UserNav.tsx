import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/login/actions";

// Async Server Component — reads the signed-in user from the Supabase
// session cookie. Kept small and rendered inside a <Suspense> boundary in
// the layout so it doesn't block the rest of the header from streaming.
export async function UserNav() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center gap-3 text-sm text-zinc-600">
      <span className="hidden sm:inline">{user.email}</span>
      <form action={logout}>
        <button
          type="submit"
          className="text-zinc-500 underline underline-offset-2 hover:text-zinc-900"
        >
          Log out
        </button>
      </form>
    </div>
  );
}
