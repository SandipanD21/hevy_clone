import Link from "next/link";
import { LogOut } from "lucide-react";
import { logout } from "@/app/login/actions";
import { getCurrentUser } from "@/lib/supabase/auth";
import { MainNav } from "./MainNav";

export async function SiteHeader() {
  const user = await getCurrentUser();

  return (
    <header className="shrink-0 border-b border-line bg-surface">
      <div className="mx-auto flex h-14 max-w-3xl items-center gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="text-[15px] font-semibold tracking-tight text-ink"
        >
          Hevy Clone
        </Link>

        {/* Nav only makes sense once signed in — every route behind it is
            personal data, and the proxy would just bounce a signed-out
            visitor back to /login. */}
        {user && (
          <div className="hidden sm:block">
            <MainNav variant="header" />
          </div>
        )}

        {user && (
          <div className="ml-auto flex items-center gap-3">
            <span className="hidden max-w-[16ch] truncate text-sm text-ink-subtle md:inline">
              {user.email}
            </span>
            <form action={logout}>
              <button
                type="submit"
                className="btn btn-ghost h-9 px-2.5"
                title="Log out"
              >
                <LogOut size={16} aria-hidden="true" />
                <span className="sr-only sm:not-sr-only">Log out</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
}
