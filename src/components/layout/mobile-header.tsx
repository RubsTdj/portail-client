"use client";

import { Avatar } from "@/components/ui/avatar";
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
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
      </button>
    </header>
  );
}
