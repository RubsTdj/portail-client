"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { mockUser } from "@/lib/mock-data";

const navItems = [
  { href: "/accueil", label: "Accueil", icon: "🏠" },
  { href: "/mes-rdv", label: "Mes RDV", icon: "📅" },
  { href: "/mes-motos", label: "Mes Motos", icon: "🏍️" },
  { href: "/mes-factures", label: "Mes Factures", icon: "📄" },
  { href: "/mon-profil", label: "Mon Profil", icon: "👤" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-[220px] flex-col border-r border-gray-100 bg-white">
      <div className="px-5 pt-6 pb-4">
        <h1 className="text-lg font-bold text-gray-900">JBF Motos ///</h1>
      </div>

      <div className="flex items-center gap-3 px-5 pb-6">
        <Avatar
          firstName={mockUser.firstName}
          lastName={mockUser.lastName}
          size="md"
        />
        <span className="text-sm font-medium text-gray-900">
          {mockUser.firstName}
        </span>
      </div>

      <nav className="flex-1 px-3">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-gray-50 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <span className="text-base">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="px-4 pb-4">
        <Link href="/prendre-rdv">
          <Button variant="primary" size="lg" fullWidth>
            PRENDRE RDV
          </Button>
        </Link>
      </div>

      <div className="px-5 pb-6">
        <button className="text-sm text-gray-500 underline hover:text-gray-700 transition-colors">
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
