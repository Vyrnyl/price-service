import {
  MdOutlineChevronLeft,
  MdOutlineChevronRight,
  MdOutlineEdit,
  MdOutlineFactCheck,
  MdOutlineGroup,
  MdOutlineLockReset,
  MdOutlineManageAccounts,
  MdOutlinePassword,
  MdOutlinePeopleAlt,
  MdOutlinePerson2,
  MdOutlinePersonAdd,
  MdOutlinePersonOff,
  MdOutlineSearch,
  MdOutlineSecurity,
  MdOutlineShield,
  MdOutlineVisibility,
} from "react-icons/md";

const stats = [
  {
    label: "Total Users",
    value: "142",
    trend: "+4 this month",
    icon: MdOutlineGroup,
    accent: "text-primary bg-primary/10",
    trendTone: "text-secondary",
  },
  {
    label: "Admins",
    value: "12",
    trend: "Security oversight",
    icon: MdOutlineShield,
    accent: "text-primary bg-primary/10",
    trendTone: "text-outline",
  },
  {
    label: "Analysts",
    value: "86",
    trend: "Data processing",
    icon: MdOutlineFactCheck,
    accent: "text-primary bg-primary/10",
    trendTone: "text-outline",
  },
  {
    label: "Monitors",
    value: "44",
    trend: "Field agents",
    icon: MdOutlineVisibility,
    accent: "text-primary bg-primary/10",
    trendTone: "text-outline",
  },
];

const users = [
  {
    initials: "JD",
    name: "Jane Dela Cruz",
    email: "jane.dc@gov.ph",
    role: "Administrator",
    roleClass: "bg-primary/10 text-primary border border-primary/20",
    status: "Active",
    statusClass: "text-secondary",
    dotClass: "bg-secondary animate-pulse",
    lastActive: "2 mins ago",
  },
  {
    initials: "RS",
    name: "Ricardo Santos",
    email: "r.santos@gov.ph",
    role: "Market Analyst",
    roleClass:
      "bg-surface-container-high text-on-surface-variant border border-outline-variant",
    status: "Active",
    statusClass: "text-secondary",
    dotClass: "bg-secondary",
    lastActive: "Today, 09:45 AM",
  },
  {
    initials: "ML",
    name: "Maria Lopez",
    email: "m.lopez@gov.ph",
    role: "Price Monitor",
    roleClass:
      "bg-surface-container-high text-on-surface-variant border border-outline-variant",
    status: "Inactive",
    statusClass: "text-outline",
    dotClass: "bg-outline",
    lastActive: "3 days ago",
  },
  {
    initials: "TB",
    name: "Tomas Bautista",
    email: "tomas.b@gov.ph",
    role: "Market Analyst",
    roleClass:
      "bg-surface-container-high text-on-surface-variant border border-outline-variant",
    status: "Active",
    statusClass: "text-secondary",
    dotClass: "bg-secondary",
    lastActive: "Yesterday, 4:20 PM",
  },
];

const auditItems = [
  {
    icon: MdOutlineSecurity,
    title: "Failed Login Attempt",
    detail: "IP: 192.168.1.45 • Attempt on admin_main • 5 mins ago",
    iconClass: "bg-error-container text-on-error-container",
  },
  {
    icon: MdOutlineManageAccounts,
    title: "Role Modification",
    detail: "Admin updated 'Tomas Bautista' to Senior Analyst • 2 hours ago",
    iconClass: "bg-primary/10 text-primary",
  },
  {
    icon: MdOutlinePassword,
    title: "Password Reset Issued",
    detail: "System generated link for 'Maria Lopez' • 4 hours ago",
    iconClass: "bg-secondary/10 text-secondary",
  },
];

export default function UsersManagementPage() {
  return (
    <main className="min-h-screen lg:ml-72">
      <section className="px-container-margin-mobile py-12 md:px-container-margin-desktop">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h1 className="font-h1-desktop text-h1-desktop text-on-surface mobile:font-h1-mobile mobile:text-h1-mobile">
                System Access
              </h1>
              <p className="mt-1 font-body-lg text-on-surface-variant">
                Manage institutional roles and monitor authentication activity
                across the platform.
              </p>
            </div>
            <button className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-body-sm font-semibold text-on-primary shadow-sm transition-all hover:shadow-md active:scale-[0.98]">
              <MdOutlinePersonAdd size={20} />
              <span>Add New User</span>
            </button>
          </div>

          <section className="flex flex-wrap gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="flex min-w-48 flex-1 flex-col rounded-2xl border border-outline-variant bg-white p-4 shadow-sm data-card-shadow"
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <span className={`rounded-xl p-2 ${stat.accent}`}>
                      <Icon size={20} />
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-outline">
                      {stat.label}
                    </span>
                  </div>
                  <p className="mb-1 font-label-caps text-label-caps text-on-surface-variant">
                    {stat.label}
                  </p>
                  <h3 className="text-[28px] font-bold leading-none text-on-surface">
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

          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-outline-variant bg-white p-4 shadow-sm lg:flex-row">
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
              <button className="flex items-center gap-1 rounded-full bg-primary-container px-4 py-1.5 text-[12px] font-semibold text-on-primary-container">
                All Roles
              </button>
              <button className="rounded-full bg-surface-container-high px-4 py-1.5 text-[12px] font-medium text-on-surface-variant transition-colors hover:bg-outline-variant">
                Admin
              </button>
              <button className="rounded-full bg-surface-container-high px-4 py-1.5 text-[12px] font-medium text-on-surface-variant transition-colors hover:bg-outline-variant">
                Analyst
              </button>
              <button className="rounded-full bg-surface-container-high px-4 py-1.5 text-[12px] font-medium text-on-surface-variant transition-colors hover:bg-outline-variant">
                Active Only
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-outline-variant bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-outline-variant bg-surface-container-low">
                    <th className="px-6 py-4 text-[11px] font-label-caps uppercase tracking-widest text-outline">
                      User Details
                    </th>
                    <th className="px-6 py-4 text-[11px] font-label-caps uppercase tracking-widest text-outline">
                      Role
                    </th>
                    <th className="px-6 py-4 text-[11px] font-label-caps uppercase tracking-widest text-outline">
                      Status
                    </th>
                    <th className="px-6 py-4 text-[11px] font-label-caps uppercase tracking-widest text-outline">
                      Last Active
                    </th>
                    <th className="px-6 py-4 text-right text-[11px] font-label-caps uppercase tracking-widest text-outline">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30">
                  {users.map((user) => (
                    <tr key={user.email} className="group transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-high font-bold text-primary">
                            {user.initials}
                          </div>
                          <div>
                            <p className="text-body-lg font-semibold leading-none text-on-surface">
                              {user.name}
                            </p>
                            <p className="mt-1 text-body-sm text-outline">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-[12px] font-semibold ${user.roleClass}`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div
                          className={`flex items-center gap-2 text-body-sm font-semibold ${user.statusClass}`}
                        >
                          <span
                            className={`h-2 w-2 rounded-full ${user.dotClass}`}
                          />
                          {user.status}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-body-sm text-on-surface-variant">
                        {user.lastActive}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-60 transition-opacity group-hover:opacity-100">
                          <button
                            className="rounded-lg p-2 transition-colors hover:bg-primary/10 hover:text-primary"
                            title="Edit Role"
                          >
                            <MdOutlineEdit size={18} />
                          </button>
                          <button
                            className="rounded-lg p-2 transition-colors hover:bg-tertiary-fixed-dim hover:text-on-tertiary-fixed"
                            title="Reset Password"
                          >
                            <MdOutlineLockReset size={18} />
                          </button>
                          <button
                            className="rounded-lg p-2 transition-colors hover:bg-error/10 hover:text-error"
                            title="Deactivate"
                          >
                            {user.status === "Active" ? (
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
              <p className="text-body-sm text-on-surface-variant">
                Showing 4 of 142 users
              </p>
              <div className="flex items-center gap-1">
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-outline-variant bg-white text-outline hover:bg-surface-container-high disabled:opacity-50"
                  disabled
                >
                  <MdOutlineChevronLeft size={20} />
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary font-semibold text-white shadow-sm">
                  1
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-outline-variant bg-white text-on-surface-variant transition-colors hover:bg-surface-container-high">
                  2
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-outline-variant bg-white text-on-surface-variant transition-colors hover:bg-surface-container-high">
                  3
                </button>
                <span className="px-2 text-outline">...</span>
                <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-outline-variant bg-white text-outline hover:bg-surface-container-high">
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
