Refactor the current authentication flow from direct client-to-backend authentication to a Backend-for-Frontend (BFF) architecture using Next.js App Router.

## Current Architecture

Frontend:
- Next.js 15 (App Router)
- TypeScript
- Uses fetch() with credentials: "include"
- Has middleware.ts for route protection

Backend:
- Express.js
- TypeScript
- JWT authentication
- Currently sets the HttpOnly cookie directly using res.cookie()

Deployment:
- Frontend: Vercel
- Backend: Render

Problem:
The backend cookie belongs to the Render domain, so Next.js middleware running on the Vercel domain cannot access it.

Goal:
The browser should communicate only with the Next.js application.
Next.js will communicate with the Express backend.
The HttpOnly cookie should be created by Next.js so middleware can read it.

========================================
BACKEND CHANGES
========================================

Modify the login endpoint.

Current behavior:

- Validate credentials.
- Generate JWT.
- Call res.cookie().
- Return user information.

New behavior:

- Validate credentials.
- Generate JWT.
- DO NOT call res.cookie().
- Return:

{
    "success": true,
    "data": {
        "accessToken": "...",
        "user": {...}
    },
    "message": "Login successful"
}

Files to modify:

- auth.controller.ts
- auth.service.ts (only if necessary)

Do not modify JWT generation.

========================================
FRONTEND CHANGES
========================================

Create a Backend-for-Frontend layer using Next.js Route Handlers.

Create:

app/api/auth/login/route.ts

Responsibilities:

1. Receive login request.
2. Forward request to Express backend.
3. Receive accessToken + user.
4. Store accessToken in an HttpOnly cookie using NextResponse.cookies.set().
5. Return only the user object to the browser.

Cookie configuration:

httpOnly: true
secure: process.env.NODE_ENV === "production"
sameSite: "lax"
path: "/"
maxAge: 60 * 60

========================================
API CLIENT
========================================

Modify the frontend API client.

Current:

Browser
↓

Express

New:

Browser
↓

Next.js API Routes
↓

Express

Update login requests so they call:

/api/auth/login

instead of

https://backend-url/auth/login

========================================
AUTHENTICATION
========================================

Create:

app/api/auth/me/route.ts

Responsibilities:

- Read cookie.
- Forward JWT to Express.
- Return authenticated user.

Use Authorization:

Bearer <token>

when forwarding the request.

========================================
LOGOUT
========================================

Create:

app/api/auth/logout/route.ts

Responsibilities:

- Delete cookie.
- Return success response.

========================================
MIDDLEWARE
========================================

Update middleware.ts.

The middleware should continue reading:

request.cookies.get("accessToken")

This should now work because the cookie belongs to the Vercel domain.

Do not change the existing authorization logic.

========================================
PROTECTED API ROUTES
========================================

For every authenticated API request:

Browser
↓

Next.js Route Handler

↓

Read HttpOnly cookie

↓

Forward Authorization: Bearer <token>

↓

Express

Never expose the JWT to client-side JavaScript.

========================================
OUTPUT
========================================

Provide:

1. Every file that must be modified.
2. Every newly created file.
3. Complete code for each modified file.
4. Explain every change.
5. Keep the existing folder structure and coding style.
6. Preserve TypeScript types.
7. Do not break existing features.