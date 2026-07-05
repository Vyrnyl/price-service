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
