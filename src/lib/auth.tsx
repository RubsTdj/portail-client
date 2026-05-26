"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { User } from "./types";
import { mockUser } from "./mock-data";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  requestPasswordReset: (email: string) => Promise<void>;
}

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  phone: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

const PUBLIC_ROUTES = ["/connexion", "/inscription", "/mot-de-passe-oublie"];

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("jbf_user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setChecked(true);
  }, []);

  useEffect(() => {
    if (!checked) return;
    const isPublic = PUBLIC_ROUTES.some((r) => pathname.startsWith(r));
    if (!user && !isPublic) {
      router.replace("/connexion");
    }
    if (user && isPublic) {
      router.replace("/accueil");
    }
  }, [user, pathname, checked, router]);

  const login = useCallback(
    async (_email: string, _password: string) => {
      await new Promise((r) => setTimeout(r, 500));
      const u = { ...mockUser };
      setUser(u);
      localStorage.setItem("jbf_user", JSON.stringify(u));
      router.replace("/accueil");
    },
    [router]
  );

  const signup = useCallback(
    async (data: SignupData) => {
      await new Promise((r) => setTimeout(r, 500));
      const u: User = {
        id: "new-user",
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
      };
      setUser(u);
      localStorage.setItem("jbf_user", JSON.stringify(u));
      router.replace("/accueil");
    },
    [router]
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("jbf_user");
    router.replace("/connexion");
  }, [router]);

  const requestPasswordReset = useCallback(async (_email: string) => {
    await new Promise((r) => setTimeout(r, 500));
  }, []);

  if (!checked) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        requestPasswordReset,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
