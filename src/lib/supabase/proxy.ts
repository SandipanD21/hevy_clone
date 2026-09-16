import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Routes that don't require the user to be signed in. Everything else in
// the app is personal data, so it's protected by default.
const PUBLIC_ROUTES = ["/login"];

/**
 * Refreshes the Supabase auth session on every request (so it doesn't expire
 * silently) and redirects signed-out users to /login. Called from proxy.ts
 * at the project root — see that file's comment for why "proxy" and not
 * "middleware" (Next.js 16 renamed the convention, same mechanism).
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refreshes the session if expired — required for Server Components,
  // which can't write cookies themselves. This also tells us who (if
  // anyone) is signed in, so we can gate access to the app below.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isPublicRoute = PUBLIC_ROUTES.includes(request.nextUrl.pathname);

  if (!user && !isPublicRoute) {
    // Not signed in and trying to reach a page that needs an account —
    // send them to log in first.
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (user && isPublicRoute) {
    // Already signed in — no reason to show the login page.
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
