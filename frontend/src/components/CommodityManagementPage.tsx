import {
  MdAddCircle,
  MdArchive,
  MdBakeryDining,
  MdEdit,
  MdEgg,
  MdFileDownload,
  MdFilterList,
  MdHistory,
  MdKitchen,
  MdOutlineInventory2,
  MdOutlineStorefront,
  MdOutlineTrendingUp,
  MdOutlineWarning,
  MdSearch,
  MdUnarchive,
} from "react-icons/md";

const summaryCards = [
  {
    label: "Total Listed",
    value: "128",
    meta: "+2 new",
    icon: MdOutlineInventory2,
    iconBg: "bg-primary-container/10",
    iconColor: "text-primary",
  },
  {
    label: "Active Monitoring",
    value: "94",
    meta: "Updated 1h ago",
    icon: MdOutlineTrendingUp,
    iconBg: "bg-tertiary-container/10",
    iconColor: "text-tertiary",
  },
  {
    label: "SRP Violations",
    value: "05",
    meta: "Critical",
    icon: MdOutlineWarning,
    iconBg: "bg-error-container/20",
    iconColor: "text-error",
    valueColor: "text-error",
    metaStyle: "text-error bg-error/10 animate-pulse",
  },
  {
    label: "Updated Today",
    value: "12",
    meta: "Ready",
    icon: MdOutlineStorefront,
    iconBg: "bg-secondary-container/10",
    iconColor: "text-secondary",
  },
];

const activityItems = [
  {
    icon: MdEdit,
    iconStyle: "bg-secondary-container text-on-secondary-container",
    title: "Well-milled Rice",
    description: "SRP updated at SM Market, Manila.",
    time: "Just Now",
    change: "₱42.00 → ₱43.50",
  },
  {
    icon: MdAddCircle,
    iconStyle: "bg-primary-container/10 text-primary",
    title: "New Commodity Added",
    description: "Coconut Oil was added to the active list.",
    time: "30 Minutes Ago",
  },
  {
    icon: MdOutlineWarning,
    iconStyle: "bg-error-container/20 text-error",
    title: "SRP Violation",
    description: "flagged: Store #042 - Onion (Red).",
    time: "1 Hour Ago",
  },
];

const commodities = [
  {
    name: "Well-milled Rice",
    category: "Grains",
    srp: "₱45.00",
    status: "Active",
    statusClass: "border border-primary text-primary", 
    icon: MdBakeryDining,
    iconBg: "bg-primary-fixed text-primary",
    actionIcon: MdHistory,
  },
  {
    name: "Chicken Egg (Medium)",
    category: "Poultry",
    srp: "₱7.00",
    status: "Active",
    statusClass: "border border-primary text-primary",
    icon: MdEgg,
    iconBg: "bg-primary-fixed text-primary",
    actionIcon: MdHistory,
  },
  {
    name: "Pork Liempo",
    category: "Meat",
    srp: "₱340.00",
    status: "Inactive",
    statusClass: "border border-outline text-outline",
    icon: MdKitchen,
    iconBg: "bg-surface-variant text-outline",
    actionIcon: MdHistory,
  },
];

export default function CommodityManagementPage() {
  return (
    <main className="min-h-screen lg:ml-72">
      <section className="px-container-margin-mobile py-12 md:px-container-margin-desktop">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="font-h1-desktop text-h1-desktop text-on-surface">
                Commodity Management
              </h2>
              <p className="mt-1 font-body-lg text-on-surface-variant">
                Track and manage commodity listings, SRP updates, and compliance status.
              </p>
            </div>
            <button className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-on-primary shadow-sm transition-all hover:shadow-md">
              <MdAddCircle size={20} />
              New Commodity
            </button>
          </div>

          <section className="flex flex-wrap gap-6">
            {summaryCards.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="flex min-w-52.5 flex-1 flex-col rounded-2xl border border-outline-variant bg-white p-6 data-card-shadow"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className={`rounded-xl p-2 ${stat.iconBg}`}>
                      <Icon className={stat.iconColor} size={24} />
                    </div>
                    {stat.meta ? (
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                          stat.metaStyle ?? "bg-primary/5 text-primary"
                        }`}
                      >
                        {stat.meta}
                      </span>
                    ) : null}
                  </div>
                  <p className="mb-1 font-label-caps text-label-caps text-on-surface-variant">
                    {stat.label}
                  </p>
                  <h3
                    className={`text-[32px] font-bold leading-none ${
                      stat.valueColor ?? "text-on-surface"
                    }`}
                  >
                    {stat.value}
                  </h3>
                </div>
              );
            })}
          </section>

          <section className="flex flex-col gap-6 xl:flex-row">
            <div className="flex min-h-105 flex-1 flex-col rounded-3xl border border-outline-variant bg-white p-6 data-card-shadow md:p-8">
              <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <h4 className="font-h3-desktop text-h3-desktop text-on-surface">
                    Commodity Overview
                  </h4>
                  <p className="text-body-sm text-on-surface-variant">
                    Active market listings and monitoring status
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1.5 rounded-xl border border-outline-variant px-3 py-2 text-xs font-semibold text-on-surface-variant">
                    <MdFilterList />
                    Category
                  </button>
                  <button className="flex items-center gap-1.5 rounded-xl border border-outline-variant px-3 py-2 text-xs font-semibold text-on-surface-variant">
                    <MdFileDownload />
                    Export
                  </button>
                </div>
              </div>

              <div className="mb-4 rounded-2xl border border-outline-variant bg-surface-container-low p-4">
                <div className="relative w-full">
                  <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={20} />
                  <input
                    className="w-full rounded-xl border border-outline-variant bg-surface py-2.5 pl-10 pr-4 text-body-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="Filter by commodity name, category, or code..."
                    type="text"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-left">
                  <thead>
                    <tr className="border-b border-outline-variant/30">
                      <th className="pb-4 text-[10px] font-semibold uppercase tracking-wide text-outline">Commodity</th>
                      <th className="pb-4 text-[10px] font-semibold uppercase tracking-wide text-outline">Category</th>
                      <th className="pb-4 text-[10px] font-semibold uppercase tracking-wide text-outline">SRP (PHP)</th>
                      <th className="pb-4 text-[10px] font-semibold uppercase tracking-wide text-outline">Status</th>
                      <th className="pb-4 text-right text-[10px] font-semibold uppercase tracking-wide text-outline">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/20">
                    {commodities.map((item) => {
                      const Icon = item.icon;
                      return (
                        <tr key={item.name}>
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${item.iconBg}`}>
                                <Icon size={18} />
                              </div>
                              <span className="font-semibold text-on-surface">{item.name}</span>
                            </div>
                          </td>
                          <td className="py-4 text-sm text-on-surface-variant">{item.category}</td>
                          <td className="py-4 text-sm font-semibold text-primary">{item.srp}</td>
                          <td className="py-4">
                            <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${item.statusClass}`}>
                              <span className={`h-1.5 w-1.5 rounded-full ${item.status === "Active" ? "bg-primary animate-pulse" : "bg-outline"}`} />
                              {item.status}
                            </span>
                          </td>
                          <td className="py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button className="rounded-lg p-2 text-on-surface-variant transition-colors hover:text-primary">
                                <MdHistory size={18} />
                              </button>
                              <button className="rounded-lg p-2 text-on-surface-variant transition-colors hover:text-primary">
                                <MdEdit size={18} />
                              </button>
                              <button className="rounded-lg p-2 text-on-surface-variant transition-colors hover:text-error">
                                {item.status === "Active" ? <MdArchive size={18} /> : <MdUnarchive size={18} />}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
