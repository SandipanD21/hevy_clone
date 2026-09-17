"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ClipboardList,
  Dumbbell,
  History,
  House,
  Play,
  type LucideIcon,
} from "lucide-react";

const NAV_LINKS: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/", label: "Home", icon: House },
  { href: "/exercises", label: "Exercises", icon: Dumbbell },
  { href: "/routines", label: "Routines", icon: ClipboardList },
  { href: "/workout", label: "Workout", icon: Play },
  { href: "/history", label: "History", icon: History },
];

// Client Component because it needs the current URL to highlight the active
// link. Rendered twice: as a row in the header on desktop, and as a bottom
// tab bar on phones (where a gym app actually gets used).
export function MainNav({ variant }: { variant: "header" | "tabs" }) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  if (variant === "tabs") {
    return (
      <nav className="grid grid-cols-5">
        {NAV_LINKS.map(({ href, label, icon: Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors ${
                active ? "text-ink" : "text-ink-subtle hover:text-ink"
              }`}
            >
              <Icon
                size={20}
                strokeWidth={active ? 2.25 : 1.75}
                aria-hidden="true"
              />
              {label}
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <nav className="flex items-center gap-1">
      {NAV_LINKS.map(({ href, label }) => {
        const active = isActive(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              active
                ? "bg-canvas text-ink"
                : "text-ink-subtle hover:bg-canvas hover:text-ink"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
