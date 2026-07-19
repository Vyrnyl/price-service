import { NextResponse, type NextRequest } from "next/server";

export const dynamic = "force-dynamic";

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

export async function GET(request: NextRequest, { params }: { params: Promise<{ path?: string[] }> }) {
  return proxy(request, params, "GET");
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ path?: string[] }> }) {
  return proxy(request, params, "POST");
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ path?: string[] }> }) {
  return proxy(request, params, "PUT");
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ path?: string[] }> }) {
  return proxy(request, params, "PATCH");
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ path?: string[] }> }) {
  return proxy(request, params, "DELETE");
}

export async function OPTIONS(request: NextRequest, { params }: { params: Promise<{ path?: string[] }> }) {
  return proxy(request, params, "OPTIONS");
}

async function proxy(
  request: NextRequest,
  paramsPromise: Promise<{ path?: string[] }>,
  method: string,
) {
  const params = await paramsPromise;
  const pathSegments = params.path ?? [];
  const upstreamPath = pathSegments.length > 0 ? `/${pathSegments.join("/")}` : "/";
  const upstreamUrl = new URL(`${upstreamPath}${request.nextUrl.search}`, API_BASE_URL);

  const headers = new Headers(request.headers);
  headers.delete("host");
  headers.delete("connection");

  let body: BodyInit | undefined;
  if (method !== "GET" && method !== "HEAD") {
    body = await request.text();
  }

  const response = await fetch(upstreamUrl, {
    method,
    headers,
    body,
    credentials: "include",
  });

  const responseText = await response.text();
  const responseHeaders = new Headers();
  copyResponseHeaders(response.headers, responseHeaders);

  return new NextResponse(responseText, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders,
  });
}
