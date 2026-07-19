import { NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const upstreamResponse = await fetch(`${BACKEND_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const text = await upstreamResponse.text();
    const data = text ? JSON.parse(text) : null;

    const response = NextResponse.json(data ?? { success: false }, {
      status: upstreamResponse.status,
    });

    const setCookies = upstreamResponse.headers.getSetCookie();
    setCookies.forEach((cookie) => {
      response.headers.append("set-cookie", cookie);
    });

    return response;
  } catch (error) {
    console.error("Auth login proxy error", error);
    return NextResponse.json(
      { success: false, message: "Unable to sign in. Please try again." },
      { status: 500 },
    );
  }
}
