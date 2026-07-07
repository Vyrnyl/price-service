"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  MdOutlineChevronLeft,
  MdOutlineChevronRight,
  MdOutlineFactCheck,
  MdOutlineGroup,
  MdOutlinePeopleAlt,
  MdOutlinePerson2,
  MdOutlinePersonAdd,
  MdOutlinePersonOff,
  MdOutlineSearch,
  MdOutlineShield,
  MdOutlineVisibility,
} from "react-icons/md";
import { createUser, getUsers, updateUserStatus } from "../api/users.api";
import type { AddUserForm, User, UserRole } from "../types/users.types";

const stats = [
  {
    label: "Total Users",
    value: "142",
    trend: "+4 this month",
    icon: MdOutlineGroup,
    accent: "text-primary bg-primary-fixed",
    trendTone: "text-secondary",
  },
  {
    label: "Admins",
    value: "12",
    trend: "Security oversight",
    icon: MdOutlineShield,
    accent: "text-primary bg-primary-fixed",
    trendTone: "text-on-surface-variant",
  },
  {
    label: "Officers",
    value: "86",
    trend: "Data processing",
    icon: MdOutlineFactCheck,
    accent: "text-secondary bg-secondary-fixed",
    trendTone: "text-on-surface-variant",
  },
  {
    label: "Monitors",
    value: "44",
    trend: "Field agents",
    icon: MdOutlineVisibility,
    accent: "text-tertiary bg-tertiary-fixed",
    trendTone: "text-on-surface-variant",
  },
];

const initialFormState: AddUserForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "OFFICER",
  isActive: true,
};

export default function UsersManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState<AddUserForm>(initialFormState);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      setIsLoadingUsers(true);
      try {
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Failed to load users", error);
      } finally {
        setIsLoadingUsers(false);
      }
    };

    loadUsers();
  }, []);

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((part) => part[0] ?? "")
      .join("")
      .slice(0, 2)
      .toUpperCase();

  const getRoleClass = (role: UserRole) => {
    if (role === "ADMIN") {
      return "border border-primary/20 bg-primary-fixed text-primary";
    }

    return "border border-outline-variant bg-surface-container-high text-on-surface-variant";
  };

  const handleCreateUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setFormError("Please fill in all required fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    setSubmitLoading(true);
    try {
      const createdUser = await createUser(formData);
      setUsers((prev) => [createdUser, ...prev]);
      setFormSuccess("User created successfully.");
      setFormData(initialFormState);
      setFormOpen(false);
    } catch (error) {
      setFormError("Unable to create user. Please check the information and try again.");
      console.error(error);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleToggleActive = async (user: User) => {
    try {
      const updatedUser = await updateUserStatus(user.id, !user.isActive);
      setUsers((prev) => prev.map((item) => (item.id === updatedUser.id ? updatedUser : item)));
    } catch (error) {
      console.error("Failed to update user status", error);
    }
  };

  return (
    <main className="min-h-screen lg:ml-72">
      <section className="px-container-margin-mobile py-12 md:px-container-margin-desktop">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h1 className="font-h1-desktop text-h1-desktop text-on-surface mobile:font-h1-mobile mobile:text-h1-mobile">
                System Access
              </h1>
              <p className="mt-1 text-body-lg text-on-surface-variant">
                Manage institutional roles and monitor authentication activity across the platform.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setFormOpen((current) => !current)}
              className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-on-primary transition-all hover:shadow-md active:scale-[0.98]"
            >
              <MdOutlinePersonAdd size={20} />
              <span>{formOpen ? "Close Add User" : "Add New User"}</span>
            </button>
          </div>

          {formOpen ? (
            <section className="mb-6 rounded-xl border border-outline-variant bg-surface-container-lowest p-6 data-card-shadow">
              <h2 className="mb-4 text-h3-desktop text-on-surface">Add New User</h2>
              <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleCreateUser}>
                <div className="space-y-1.5">
                  <label className="block text-body-sm font-medium text-on-surface" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                    className="w-full rounded-xl border border-outline bg-surface px-4 py-3 text-body-sm text-on-surface outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="Jane Dela Cruz"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-body-sm font-medium text-on-surface" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                    className="w-full rounded-xl border border-outline bg-surface px-4 py-3 text-body-sm text-on-surface outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="jane.dc@gov.ph"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-body-sm font-medium text-on-surface" htmlFor="role">
                    Role
                  </label>
                  <select
                    id="role"
                    value={formData.role}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        role: event.target.value as UserRole,
                      }))
                    }
                    className="w-full rounded-xl border border-outline bg-surface px-4 py-3 text-body-sm text-on-surface outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="ADMIN">Administrator</option>
                    <option value="OFFICER">Officer</option>
                    <option value="PUBLIC">Public</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-body-sm font-medium text-on-surface" htmlFor="password">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(event) => setFormData((prev) => ({ ...prev, password: event.target.value }))}
                    className="w-full rounded-xl border border-outline bg-surface px-4 py-3 text-body-sm text-on-surface outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="••••••••"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-body-sm font-medium text-on-surface" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(event) => setFormData((prev) => ({ ...prev, confirmPassword: event.target.value }))}
                    className="w-full rounded-xl border border-outline bg-surface px-4 py-3 text-body-sm text-on-surface outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="••••••••"
                  />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="flex items-center gap-3 text-body-sm text-on-surface">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(event) =>
                        setFormData((prev) => ({ ...prev, isActive: event.target.checked }))
                      }
                      className="h-4 w-4 rounded border-outline text-primary focus:ring-primary/30"
                    />
                    Active account
                  </label>
                </div>
                <div className="flex items-center gap-3 sm:col-span-2">
                  <button
                    type="submit"
                    disabled={submitLoading}
                    className="rounded-xl bg-primary px-6 py-3 text-body-sm font-semibold text-on-primary transition hover:bg-primary-container disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitLoading ? "Creating..." : "Create User"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFormOpen(false);
                      setFormError(null);
                    }}
                    className="rounded-xl border border-outline px-6 py-3 text-body-sm font-semibold text-on-surface transition hover:bg-surface-container-high"
                  >
                    Cancel
                  </button>
                </div>
                {(formError || formSuccess) && (
                  <div className="sm:col-span-2">
                    {formError ? (
                      <p className="text-body-sm text-error">{formError}</p>
                    ) : (
                      <p className="text-body-sm text-secondary">{formSuccess}</p>
                    )}
                  </div>
                )}
              </form>
            </section>
          ) : null}

          <section className="flex flex-wrap gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="flex min-w-0 flex-1 flex-col rounded-xl border border-outline-variant bg-surface-container-lowest p-6 data-card-shadow"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <span className={`rounded-xl p-2 ${stat.accent}`}>
                      <Icon size={20} />
                    </span>
                    <span className="text-label-caps uppercase text-outline">
                      {stat.label}
                    </span>
                  </div>
                  <p className="mb-1 text-label-caps text-on-surface-variant">
                    {stat.label}
                  </p>
                  <h3 className="text-h2-desktop text-on-surface">
                    {stat.value}
                  </h3>
                  <div className={`mt-2 flex items-center gap-1 text-body-sm ${stat.trendTone}`}>
                    <MdOutlinePeopleAlt size={12} />
                    <span>{stat.trend}</span>
                  </div>
                </div>
              );
            })}
          </section>

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
              />
            </div>
            <div className="flex w-full items-center gap-2 overflow-x-auto pb-1 lg:w-auto lg:pb-0">
              <span className="mr-2 whitespace-nowrap text-body-sm font-semibold text-on-surface">
                Filter by:
              </span>
              <button className="rounded-full bg-primary-container px-4 py-1.5 text-label-caps font-semibold text-on-primary-container">
                All Roles
              </button>
              <button className="rounded-full bg-surface-container-high px-4 py-1.5 text-label-caps font-medium text-on-surface-variant transition-colors hover:bg-surface-container-highest">
                Admin
              </button>
              <button className="rounded-full bg-surface-container-high px-4 py-1.5 text-label-caps font-medium text-on-surface-variant transition-colors hover:bg-surface-container-highest">
                Officer
              </button>
              <button className="rounded-full bg-surface-container-high px-4 py-1.5 text-label-caps font-medium text-on-surface-variant transition-colors hover:bg-surface-container-highest">
                Active Only
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest data-card-shadow">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-outline-variant bg-surface-container-low">
                    <th className="px-6 py-4 text-label-caps uppercase text-outline">
                      User Details
                    </th>
                    <th className="px-6 py-4 text-label-caps uppercase text-outline">
                      Role
                    </th>
                    <th className="px-6 py-4 text-label-caps uppercase text-outline">
                      Status
                    </th>
                    <th className="px-6 py-4 text-label-caps uppercase text-outline">
                      Last Active
                    </th>
                    <th className="px-6 py-4 text-right text-label-caps uppercase text-outline">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30">
                  {users.map((user) => (
                    <tr key={user.id} className="group transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-high font-bold text-primary">
                            {getInitials(user.name)}
                          </div>
                          <div>
                            <p className="text-body-sm font-semibold leading-none text-on-surface">
                              {user.name}
                            </p>
                            <p className="mt-1 text-body-xs text-outline">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-label-caps font-semibold ${getRoleClass(user.role)}`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div
                          className={`flex items-center gap-2 text-body-sm font-semibold ${
                            user.isActive ? "text-secondary" : "text-outline"
                          }`}
                        >
                          <span
                            className={`h-2 w-2 rounded-full ${
                              user.isActive ? "bg-secondary" : "bg-outline"
                            }`}
                          />
                          {user.isActive ? "Active" : "Inactive"}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-body-sm text-on-surface-variant">
                        {user.lastActive ?? "-"}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-60 transition-opacity group-hover:opacity-100">
                          <button
                            className="rounded-lg p-2 transition-colors hover:bg-error-container hover:text-error"
                            title={user.isActive ? "Deactivate user" : "Activate user"}
                            onClick={() => handleToggleActive(user)}
                          >
                            {user.isActive ? (
                              <MdOutlinePersonOff size={18} />
                            ) : (
                              <MdOutlinePerson2 size={18} />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between border-t border-outline-variant bg-surface-container-low px-6 py-4">
              <p className="text-body-sm text-on-surface-variant">Showing {users.length} users</p>
              <div className="flex items-center gap-1">
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-outline-variant bg-surface-container-lowest text-outline hover:bg-surface-container-high disabled:opacity-50"
                  disabled
                >
                  <MdOutlineChevronLeft size={20} />
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary font-semibold text-on-primary">
                  1
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface-variant transition-colors hover:bg-surface-container-high">
                  2
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface-variant transition-colors hover:bg-surface-container-high">
                  3
                </button>
                <span className="px-2 text-outline">...</span>
                <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-outline-variant bg-surface-container-lowest text-outline hover:bg-surface-container-high">
                  <MdOutlineChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
