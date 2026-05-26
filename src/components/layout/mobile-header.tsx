"use client";

import { Avatar } from "@/components/ui/avatar";
import { IconLogOut } from "@/components/ui/icons";
import { useAuth } from "@/lib/auth";
import { mockUser } from "@/lib/mock-data";

export function MobileHeader() {
  const { user, logout } = useAuth();
  const displayUser = user || mockUser;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex h-14 items-center justify-between border-b border-gray-100 bg-white px-4 lg:hidden">
      <Avatar
        firstName={displayUser.firstName}
        lastName={displayUser.lastName}
        size="sm"
      />
      <h1 className="text-base font-bold text-gray-900">JBF Motos ///</h1>
      <button
        onClick={logout}
        className="p-1.5 text-gray-500 hover:text-gray-700 transition-colors"
        aria-label="Déconnexion"
      >
        <IconLogOut size={22} />
      </button>
    </header>
  );
}
