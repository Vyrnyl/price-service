"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  MdOutlineDashboard,
  MdOutlineInventory2,
  MdOutlineLogout,
  MdOutlineStorefront,
  MdOutlineTrendingUp,
} from "react-icons/md";
import { HiUsers } from "react-icons/hi2";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { useRouter } from "next/navigation";
import {
  getRoleFromServer,
  logoutFromServer,
  type UserRole,
} from "../lib/auth";

const roleSpecificLinks: Record<
  UserRole,
  Array<{ href: string; icon: React.ElementType; label: string }>
> = {
  admin: [
    { href: "/admin", icon: MdOutlineDashboard, label: "Admin Dashboard" },
    {
      href: "/admin/commodities",
      icon: MdOutlineInventory2,
      label: "Commodities",
    },
    {
      href: "/admin/stores",
      icon: MdOutlineStorefront,
      label: "Stores",
    },
    { href: "/admin/users", icon: HiUsers, label: "Users" },
    {
      href: "/admin/price-records",
      icon: MdOutlineTrendingUp,
      label: "Price Records",
    },
  ],
  officer: [
    { href: "/officer", icon: MdOutlineDashboard, label: "Officer Dashboard" },
    {
      href: "/officer/commodities",
      icon: MdOutlineInventory2,
      label: "Commodities",
    },
    {
      href: "/officer/stores",
      icon: MdOutlineStorefront,
      label: "Store Registry",
    },
    {
      href: "/officer/price-records",
      icon: MdOutlineTrendingUp,
      label: "Price Records",
    },
    {
      href: "/officer/reports",
      icon: HiOutlineDocumentReport,
      label: "Reports",
    },
  ],
  public: [
    { href: "/", icon: MdOutlineDashboard, label: "Dashboard" },
    {
      href: "/commodity-list",
      icon: MdOutlineInventory2,
      label: "Commodity List",
    },
    {
      href: "/price-analysis",
      icon: MdOutlineTrendingUp,
      label: "Price Analysis",
    },
  ],
} as const;

export default function NavigationDrawer({
  activePath,
  isOpen,
  onClose,
}: {
  activePath: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [role, setRole] = useState<UserRole | null>(null);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    getRoleFromServer().then((r) => {
      if (mounted) setRole(r);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const links = role ? roleSpecificLinks[role] : [];

  const handleLogout = async () => {
    try {
      await logoutFromServer();
    } catch (error) {
      console.error("Logout failed", error);
    }

    setRole("public");
    router.push("/login");
    onClose();
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-black/30 transition-opacity duration-200 lg:hidden ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed left-0 top-0 z-40 mt-16 flex h-[calc(100vh-4rem)] w-72 flex-col rounded-r-xl bg-surface-container shadow-lg transition-transform duration-200 ease-out lg:mt-0 lg:h-full lg:w-72 lg:translate-x-0 lg:rounded-none lg:shadow-none ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-8 px-6 pt-8">
          <h2 className="font-label-caps text-label-caps uppercase tracking-widest text-outline">
            Navigation
          </h2>
        </div>
        {!role ? (
          <div className="px-6 py-4 text-sm text-on-surface-variant">
            Loading navigation...
          </div>
        ) : (
          <nav className="flex flex-col gap-2">
            {links.map((item) => {
            const Icon = item.icon;
            const isActive = activePath === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`mx-2 flex items-center gap-4 rounded-full px-6 py-3 transition-all ${
                  isActive
                    ? "bg-secondary-container text-on-secondary-container"
                    : "text-on-surface-variant hover:bg-surface-variant"
                }`}
              >
                <Icon />
                <span className="font-body-sm text-body-sm">{item.label}</span>
              </Link>
            );
          })}
            {role !== "public" ? (
              <button
                type="button"
                onClick={handleLogout}
                className="mx-2 mt-2 flex items-center gap-4 rounded-full px-6 py-3 text-on-surface-variant transition-all hover:bg-surface-variant"
              >
                <MdOutlineLogout />
                <span className="font-body-sm text-body-sm">Logout</span>
              </button>
            ) : null}
            <hr className="mx-6 my-4 border-outline-variant" />
          </nav>
        )}
      </aside>
    </>
  );
}
