"use client";

import { useEffect, useState } from "react";

export type AuthUser = {
  id: string;
  email: string;
};

export type AuthState = {
  user: AuthUser | null;
  isLoading: boolean;
};

/**
 * Placeholder auth hook used by PrimaryCtaLink.
 *
 * In production, replace this with your real auth provider
 * (e.g. NextAuth, Clerk, custom JWT, etc.) but keep the
 * returned shape `{ user, isLoading }` the same.
 *
 * For local testing you can simulate a logged-in user in the
 * browser console:
 *
 *   window.__COCOON_USER = { id: "demo", email: "you@example.com" }
 *
 * Remove this shim once proper auth is wired up.
 */
export function useAuthUser(): AuthState {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") {
      setIsLoading(false);
      return;
    }

    type WithCocoonUser = Window & {
      __COCOON_USER?: AuthUser | null;
    };

    const w = window as WithCocoonUser;
    if (w.__COCOON_USER) {
      setUser(w.__COCOON_USER);
    } else {
      setUser(null);
    }
    setIsLoading(false);
  }, []);

  return { user, isLoading };
}
