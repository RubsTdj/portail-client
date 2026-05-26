"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { IconHome, IconCalendar, IconMotorcycle, IconUser, IconPlus } from "@/components/ui/icons";

const navItems = [
  { href: "/accueil", label: "Accueil", Icon: IconHome },
  { href: "/mes-rdv", label: "RDV", Icon: IconCalendar },
  { href: "/mes-motos", label: "Motos", Icon: IconMotorcycle },
  { href: "/mon-profil", label: "Profil", Icon: IconUser },
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
              <item.Icon
                size={22}
                className={isActive ? "text-primary-500" : "text-gray-400"}
              />
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
            <IconPlus size={28} className="text-white" />
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
              <item.Icon
                size={22}
                className={isActive ? "text-primary-500" : "text-gray-400"}
              />
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
