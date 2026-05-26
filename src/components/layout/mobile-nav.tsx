"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/accueil", label: "Accueil", icon: "🏠" },
  { href: "/mes-rdv", label: "RDV", icon: "📅" },
  { href: "/mes-motos", label: "Motos", icon: "🏍️" },
  { href: "/mon-profil", label: "Profil", icon: "👤" },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-100 bg-white pb-[env(safe-area-inset-bottom)] lg:hidden">
      <div className="flex h-16 items-end justify-around px-2">
        {navItems.slice(0, 2).map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-0.5 py-1.5"
            >
              <span className="text-lg">{item.icon}</span>
              <span
                className={cn(
                  "text-[10px] font-medium",
                  isActive ? "text-primary-500" : "text-gray-500"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}

        <Link
          href="/prendre-rdv"
          className="-mt-5 flex items-center justify-center"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-500 shadow-lg shadow-primary-500/30 active:bg-primary-600 transition-colors">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
        </Link>

        {navItems.slice(2).map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-0.5 py-1.5"
            >
              <span className="text-lg">{item.icon}</span>
              <span
                className={cn(
                  "text-[10px] font-medium",
                  isActive ? "text-primary-500" : "text-gray-500"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
