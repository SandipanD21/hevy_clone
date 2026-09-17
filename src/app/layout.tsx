import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { MainNav } from "@/components/MainNav";
import { SiteHeader } from "@/components/SiteHeader";
import { getCurrentUser } from "@/lib/supabase/auth";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hevy Clone",
  description:
    "Personal workout tracker — routines, logging, and progress over time.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const user = await getCurrentUser();

  return (
    <html lang="en" className={geist.className}>
      {/*
        The shell is exactly one viewport tall (h-dvh) and doesn't scroll
        itself. Scrolling happens *inside* <main>, or inside a panel on a page
        that wants it (see the exercise list). That's what keeps the header
        and mobile tab bar pinned in place instead of scrolling away.
      */}
      <body className="flex h-dvh flex-col overflow-hidden">
        <SiteHeader />

        <main className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto h-full w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
            {children}
          </div>
        </main>

        {/* Bottom tab bar on phones — the app's main nav at the gym. */}
        {user && (
          <div className="shrink-0 border-t border-line bg-surface pb-[env(safe-area-inset-bottom)] sm:hidden">
            <MainNav variant="tabs" />
          </div>
        )}
      </body>
    </html>
  );
}
