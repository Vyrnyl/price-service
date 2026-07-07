"use client";

import AppShell from "../../../components/AppShell";
import LoginPage from "../../../features/auth/components/LoginPage";

export default function LoginRoute() {
  return (
    <AppShell activePath="/login" hideNavigation>
      <LoginPage />
    </AppShell>
  );
}
