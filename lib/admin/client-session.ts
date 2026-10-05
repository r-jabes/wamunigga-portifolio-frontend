"use client";

import { useSyncExternalStore } from "react";

const ADMIN_TOKEN_KEY = "wamunigga-admin-token";
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getAdminSessionToken(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(ADMIN_TOKEN_KEY);
}

export function setAdminSessionToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) sessionStorage.setItem(ADMIN_TOKEN_KEY, token);
  else sessionStorage.removeItem(ADMIN_TOKEN_KEY);
  listeners.forEach((listener) => listener());
}

export function useAdminSessionToken() {
  return useSyncExternalStore(
    subscribe,
    getAdminSessionToken,
    () => null,
  );
}
