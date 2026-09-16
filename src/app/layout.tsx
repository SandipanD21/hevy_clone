import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hevy Clone",
  description: "Personal workout tracker — routines, logging, and progress over time.",
};

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/exercises", label: "Exercises" },
  { href: "/routines", label: "Routines" },
  { href: "/workout", label: "Workout" },
  { href: "/history", label: "History" },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-900">
        <header className="border-b border-zinc-200 bg-white">
          <nav className="mx-auto flex max-w-3xl items-center gap-6 px-6 py-4">
            <span className="font-semibold">Hevy Clone</span>
            <div className="flex gap-4 text-sm text-zinc-600">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-zinc-900"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </header>
        <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10">
          {children}
        </main>
      </body>
    </html>
  );
}
