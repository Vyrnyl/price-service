"use client";

import Link from "next/link";
import { MdOutlineAnalytics } from "react-icons/md";
import { LuLogIn } from "react-icons/lu";
import { useEffect, useState } from "react";
import { getRoleFromServer, type UserRole } from "@/lib/auth";

export default function TopAppBar({
  activePath,
}: {
  activePath: string;
}) {
  const [role, setRole] = useState<UserRole>("public");

  useEffect(() => {
    let mounted = true;
    getRoleFromServer().then((userRole) => {
      if (mounted) setRole(userRole);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const showLoginButton = activePath !== "/login" && role === "public";

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-outline-variant bg-surface px-container-margin-mobile py-stack-md shadow-sm md:px-container-margin-desktop">
      <Link href="/" className="flex items-center gap-3">
        <MdOutlineAnalytics className="text-primary" size={28} />
        <h1 className="font-h2-desktop text-h2-desktop font-bold text-primary">
          PresyoSerbisyo
        </h1>
      </Link>
      <div className="flex items-center gap-3">
        {showLoginButton ? (
          <Link href="/login">
            <button className="hidden items-center gap-2 rounded-lg bg-primary px-4 py-2 font-label-caps text-label-caps text-on-primary transition-opacity hover:opacity-90 md:flex">
              <LuLogIn fontSize={12} />
              LOGIN
            </button>
          </Link>
        ) : null}
      </div>
    </header>
  );
}
