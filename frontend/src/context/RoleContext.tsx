"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type UserRole = "public" | "officer" | "admin";

const ROLE_STORAGE_KEY = "price-service-role";

interface RoleContextValue {
  role: UserRole;
  setRole: (role: UserRole) => void;
  isAdmin: boolean;
  isMonitoringOfficer: boolean;
  isPublicUser: boolean;
}

const RoleContext = createContext<RoleContextValue | undefined>(undefined);

function getInitialRole(): UserRole {
  if (typeof window === "undefined") {
    return "public";
  }

  const storedRole = window.localStorage.getItem(ROLE_STORAGE_KEY);

  if (
    storedRole === "public" ||
    storedRole === "officer" ||
    storedRole === "admin"
  ) {
    return storedRole;
  }

  return "public";
}

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>(getInitialRole);

  useEffect(() => {
    window.localStorage.setItem(ROLE_STORAGE_KEY, role);
  }, [role]);

  const value = useMemo(
    () => ({
      role,
      setRole,
      isAdmin: role === "admin",
      isMonitoringOfficer: role === "officer",
      isPublicUser: role === "public",
    }),
    [role]
  );

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export function useRole() {
  const context = useContext(RoleContext);

  if (!context) {
    throw new Error("useRole must be used within a RoleProvider");
  }

  return context;
}
