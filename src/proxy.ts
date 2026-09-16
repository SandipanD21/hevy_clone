import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

// Next.js 16 renamed "Middleware" to "Proxy" (same mechanism, new file/export
// name) — this file replaces what used to be middleware.ts. It runs on the
// server before every matched request. Lives at src/proxy.ts (not the repo
// root) because this project's app router lives at src/app — the file has
// to sit at the same level as pages/app, per the Next.js convention.
export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static assets and image optimization
     * files, so the auth session gets refreshed on every page/API request.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
