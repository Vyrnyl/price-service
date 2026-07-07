"use client";

import { MdOutlineSearch } from "react-icons/md";
import type { UserRole } from "../types/users.types";

type UsersSearchFiltersProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  roleFilter: "ALL" | UserRole;
  onRoleFilterChange: (value: "ALL" | UserRole) => void;
  showActiveOnly: boolean;
  onActiveFilterChange: (value: boolean) => void;
};

export default function UsersSearchFilters({
  searchTerm,
  onSearchChange,
  roleFilter,
  onRoleFilterChange,
  showActiveOnly,
  onActiveFilterChange,
}: UsersSearchFiltersProps) {
  return (
    <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-outline-variant bg-surface-container-lowest p-4 data-card-shadow lg:flex-row">
      <div className="relative w-full lg:w-96">
        <MdOutlineSearch
          className="absolute left-3 top-1/2 -translate-y-1/2 text-outline"
          size={20}
        />
        <input
          className="w-full rounded-xl border border-outline-variant bg-surface-container-low py-2.5 pl-10 pr-4 text-body-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
          placeholder="Search by name, email or role..."
          type="text"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>
      <div className="flex w-full items-center gap-2 overflow-x-auto pb-1 lg:w-auto lg:pb-0">
        <span className="mr-2 whitespace-nowrap text-body-sm font-semibold text-on-surface">
          Filter by:
        </span>
        <button
          type="button"
          onClick={() => onRoleFilterChange("ALL")}
          className={`rounded-full px-4 py-1.5 text-label-caps font-semibold transition-colors ${
            roleFilter === "ALL"
              ? "bg-primary-container text-on-primary-container"
              : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
          }`}
        >
          All Roles
        </button>
        <button
          type="button"
          onClick={() => onRoleFilterChange("ADMIN")}
          className={`rounded-full px-4 py-1.5 text-label-caps font-medium transition-colors ${
            roleFilter === "ADMIN"
              ? "bg-primary-container text-on-primary-container"
              : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
          }`}
        >
          Admin
        </button>
        <button
          type="button"
          onClick={() => onRoleFilterChange("OFFICER")}
          className={`rounded-full px-4 py-1.5 text-label-caps font-medium transition-colors ${
            roleFilter === "OFFICER"
              ? "bg-primary-container text-on-primary-container"
              : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
          }`}
        >
          Officer
        </button>
        <button
          type="button"
          onClick={() => onRoleFilterChange("PUBLIC")}
          className={`rounded-full px-4 py-1.5 text-label-caps font-medium transition-colors ${
            roleFilter === "PUBLIC"
              ? "bg-primary-container text-on-primary-container"
              : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
          }`}
        >
          Public
        </button>
        <button
          type="button"
          onClick={() => onActiveFilterChange(!showActiveOnly)}
          className={`rounded-full px-4 py-1.5 text-label-caps font-medium transition-colors ${
            showActiveOnly
              ? "bg-primary-container text-on-primary-container"
              : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
          }`}
        >
          Active Only
        </button>
      </div>
    </div>
  );
}
