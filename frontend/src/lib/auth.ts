import { apiFetch } from "./api";

export type UserRole = "public" | "officer" | "admin";

export async function getRoleFromServer(): Promise<UserRole> {
  try {
    const res = await fetch("/api/auth/role", { cache: "no-store" });
    if (!res.ok) return "public";
    const data = await res.json();
    const role = data?.role;
    if (role === "admin" || role === "officer" || role === "public") return role;
    return "public";
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
