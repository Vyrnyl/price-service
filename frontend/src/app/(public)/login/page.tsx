"use client";

import AppShell from "../../../components/AppShell";
import { useState } from "react";

export default function LoginRoute() {
  const [role, setRole] = useState<"officer" | "admin">("officer");
  const [showPassword, setShowPassword] = useState(false);

    const login = async () => {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'vern@gmail.com',
        password: 'vern12345'
      })
    });
    const data = await response.json();
    console.log(data)
  }
  login();
  
  return (
    <AppShell activePath="/login" hideNavigation>
      <main className="min-h-screen flex items-center justify-center bg-background px-container-margin-mobile py-12 md:px-container-margin-desktop">
        <div className="w-full max-w-[480px] rounded-3xl border border-outline-variant bg-surface-container-lowest p-8 shadow-sm">
          <div className="text-center mb-8">
            <h1 className="font-h1-desktop text-h1-mobile font-bold text-on-surface md:text-h1-desktop">
              Welcome Back
            </h1>
            <p className="mt-2 text-body-lg text-on-surface-variant">
              Sign in to access the Monitoring & SRP Portal
            </p>
          </div>

          <form
            className="space-y-6"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="grid grid-cols-2 gap-2 rounded-2xl border border-outline-variant bg-surface-container p-1">
              <button
                type="button"
                className={`rounded-2xl py-3 text-body-sm font-semibold transition ${
                  role === "officer"
                    ? "bg-primary text-on-primary"
                    : "text-on-surface-variant hover:bg-surface-container-high"
                }`}
                onClick={() => setRole("officer")}
              >
                Monitoring Officer
              </button>
              <button
                type="button"
                className={`rounded-2xl py-3 text-body-sm font-semibold transition ${
                  role === "admin"
                    ? "bg-primary text-on-primary"
                    : "text-on-surface-variant hover:bg-surface-container-high"
                }`}
                onClick={() => setRole("admin")}
              >
                Administrator
              </button>
            </div>

            <div className="space-y-1.5">
              <label
                className="block text-body-sm font-label-md text-on-surface"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
                  mail
                </span>
                <input
                  id="email"
                  type="email"
                  placeholder="name@agency.gov.ph"
                  className="w-full rounded-xl border border-outline bg-surface px-4 pl-12 py-3 text-body-sm text-on-surface placeholder:text-on-surface-variant outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  className="block text-body-sm font-label-md text-on-surface"
                  htmlFor="password"
                >
                  Password
                </label>
                <button
                  className="text-primary text-body-sm font-label-sm hover:underline"
                  type="button"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
                  lock
                </span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-outline bg-surface px-4 pl-12 py-3 pr-12 text-body-sm text-on-surface placeholder:text-on-surface-variant outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <span className="material-symbols-outlined">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-outline text-primary focus:ring-primary/30"
              />
              <label
                htmlFor="remember"
                className="text-body-sm text-on-surface-variant"
              >
                Remember Me
              </label>
            </div>

            <div className="space-y-4">
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-4 text-body-sm font-semibold text-on-primary transition hover:opacity-90 active:scale-[0.98]"
              >
                <span>Sign In</span>
                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
              </button>

              <div className="flex items-center justify-center gap-2 text-body-sm text-secondary">
                <span
                  className="material-symbols-outlined text-[16px]"
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  verified_user
                </span>
                <span>Secure Government-Grade Login</span>
              </div>
            </div>

            <div className="relative flex items-center py-2">
              <div className="flex-1 border-t border-outline-variant"></div>
              <span className="mx-4 text-center text-[12px] uppercase tracking-[0.24em] text-on-surface-variant">
                or sign in with
              </span>
              <div className="flex-1 border-t border-outline-variant"></div>
            </div>

            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-primary px-4 py-3 text-body-sm font-semibold text-primary transition hover:bg-surface-container-lowest"
            >
              <span className="material-symbols-outlined">fingerprint</span>
              <span>Biometric Login</span>
            </button>
          </form>

          <p className="mt-8 text-center text-body-sm text-on-surface-variant">
            Access to this portal is restricted to authorized personnel of DTI
            Catanduanes. Unauthorized access attempts are logged and may be
            subject to investigation.
          </p>
        </div>
      </main>
    </AppShell>
  );
}
