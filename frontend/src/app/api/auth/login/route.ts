import { NextResponse, type NextRequest } from "next/server";

const API_BASE_URL = process.env.BACKEND_API_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000";

function copyResponseHeaders(source: Headers, target: Headers) {
  source.forEach((value, key) => {
    const lowerKey = key.toLowerCase();
    if (lowerKey === "content-length" || lowerKey === "transfer-encoding") {
      return;
    }

    if (lowerKey === "set-cookie") {
      target.append(key, value);
      return;
    }

    target.set(key, value);
  });
}

export async function POST(request: NextRequest) {
  console.log("Login request received", API_BASE_URL);
  const upstreamUrl = new URL("/api/auth/login", API_BASE_URL);
  const body = await request.text();

  const response = await fetch(upstreamUrl, {
    method: "POST",
    headers: new Headers(request.headers),
    body,
    credentials: "include",
  });

  const responseText = await response.text();
  const responseHeaders = new Headers();
  copyResponseHeaders(response.headers, responseHeaders);

  if (!responseHeaders.has("content-type") && responseText) {
    responseHeaders.set("content-type", "application/json; charset=utf-8");
  }

  return new NextResponse(responseText, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders,
  });
}
