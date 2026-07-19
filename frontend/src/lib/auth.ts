import { apiFetch } from "./api";

export type UserRole = "public" | "officer" | "admin";

export function normalizeUserRole(role: string | null | undefined): UserRole {
  const normalized = role?.trim().toLowerCase();

  if (normalized === "admin" || normalized === "officer" || normalized === "public") {
    return normalized;
  }

  return "public";
}

export async function getRoleFromServer(): Promise<UserRole> {
  try {
    const res = await fetch("/api/auth/role", { cache: "no-store" });
    if (!res.ok) return "public";
    const data = await res.json();
    return normalizeUserRole(data?.role);
  } catch {
    return "public";
  }
}

export async function logoutFromServer(): Promise<void> {
  await apiFetch<{ success: boolean }>("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });
}
