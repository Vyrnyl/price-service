"use client";

import Link from "next/link";
import {
  MdOutlineDashboard,
  MdOutlineInventory2,
  MdOutlineSettings,
  MdOutlineStorefront,
  MdOutlineTrendingUp,
} from "react-icons/md";
import { HiUsers } from "react-icons/hi2";
import { useRole } from "../context/RoleContext";
import { HiOutlineDocumentReport } from "react-icons/hi";

const roleSpecificLinks = {
  admin: [
    { href: "/admin", icon: MdOutlineDashboard, label: "Admin Dashboard" },
    {
      href: "/admin/commodities",
      icon: MdOutlineInventory2,
      label: "Commodities",
    },
    { href: "/admin/users", icon: HiUsers, label: "Users" },
    { href: "/admin/settings", icon: MdOutlineSettings, label: "Settings" },
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
      href: "/officer/reports",
      icon: HiOutlineDocumentReport,
      label: "Reports",
    },
    { href: "/officer/settings", icon: MdOutlineSettings, label: "Settings" },
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
}: {
  activePath: string;
}) {
  const { role } = useRole();
  const links = roleSpecificLinks["admin"];

  return (
    <aside className="fixed left-0 top-0 z-40 mt-20 hidden h-full w-72 flex-col rounded-r-xl bg-surface-container pt-8 shadow-lg lg:flex">
      <div className="mb-8 px-6">
        <h2 className="font-label-caps text-label-caps uppercase tracking-widest text-outline">
          Navigation
        </h2>
      </div>
      <nav className="flex flex-col gap-2">
        {links.map((item) => {
          const Icon = item.icon;
          const isActive = activePath === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
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
        <hr className="mx-6 my-4 border-outline-variant" />
      </nav>
    </aside>
  );
}
