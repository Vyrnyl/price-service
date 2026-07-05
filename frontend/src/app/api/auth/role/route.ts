import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "../../../../lib/jwt";

function normalizeJwtRole(role: string | null) {
  if (role === "ADMIN") return "admin";
  if (role === "OFFICER") return "officer";
  if (role === "PUBLIC") return "public";
  return null;
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json({ role: "public" });
    }

    const payload = await verifyToken(token);
    const rawRole = typeof payload.role === "string" ? payload.role : null;
    const role = normalizeJwtRole(rawRole) ?? "public";

    return NextResponse.json({ role });
  } catch (err) {
    return NextResponse.json({ role: "public" });
  }
}
