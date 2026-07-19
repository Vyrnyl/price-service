import { NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000";

export async function POST(request: Request) {
  try {
    const upstreamResponse = await fetch(`${BACKEND_URL}/api/auth/logout`, {
      method: "POST",
      headers: {
        cookie: request.headers.get("cookie") ?? "",
      },
    });

    const text = await upstreamResponse.text();
    const data = text ? JSON.parse(text) : null;

    const response = NextResponse.json(data ?? { success: true }, {
      status: upstreamResponse.status,
    });

    const setCookies = upstreamResponse.headers.getSetCookie();
    setCookies.forEach((cookie) => {
      response.headers.append("set-cookie", cookie);
    });

    return response;
  } catch (error) {
    console.error("Auth logout proxy error", error);
    return NextResponse.json({ success: true, message: "Logout successful" });
  }
}
