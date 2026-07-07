import {
  MdAssignmentTurnedIn,
  MdFlag,
  MdInventory2,
  MdNotificationsActive,
  MdSearch,
  MdStore,
  MdTrendingUp,
} from "react-icons/md";

const stats = [
  {
    label: "Pending Reviews",
    value: "12",
    icon: MdAssignmentTurnedIn,
    tone: "text-primary",
    bg: "bg-primary/10",
  },
  {
    label: "Flagged Items",
    value: "4",
    icon: MdFlag,
    tone: "text-error",
    bg: "bg-error/10",
  },
  {
    label: "Compliant Stores",
    value: "31",
    icon: MdStore,
    tone: "text-[#00897B]",
    bg: "bg-[#E8F5E9]",
  },
  {
    label: "Price Updates",
    value: "86",
    icon: MdTrendingUp,
    tone: "text-secondary",
    bg: "bg-secondary/10",
  },
];

const rows = [
  {
    commodity: "Rice (Well-milled)",
    store: "ABC Supermarket",
    region: "Virac",
    price: "₱58.00",
    srp: "₱55.00",
    status: "Above SRP",
    statusClass: "bg-error text-on-error",
  },
  {
    commodity: "Cooking Oil",
    store: "Virac Public Market",
    region: "Virac",
    price: "₱85.00",
    srp: "₱85.00",
    status: "Compliant",
    statusClass: "bg-[#00897B] text-on-primary",
  },
  {
    commodity: "Canned Sardines",
    store: "SaveMore Virac",
    region: "Bato",
    price: "₱19.50",
    srp: "₱21.00",
    status: "Below SRP",
    statusClass: "bg-tertiary-container text-on-tertiary",
  },
];

export default function MonitoringOfficerDashboardPage() {
  return (
    <main className="min-h-screen lg:ml-72">
      <section className="px-container-margin-mobile py-12 md:px-container-margin-desktop">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-h1-desktop text-h1-desktop text-on-surface">
                Monitoring Officer Overview
              </h2>
              <p className="mt-1 font-body-lg text-on-surface-variant">
                Track compliance, reviews, and price updates across the province.
              </p>
            </div>
            <button className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-body-sm font-semibold text-on-primary shadow-sm transition-all hover:shadow-md">
              <MdNotificationsActive />
              View Alerts
            </button>
          </div>

          <section className="flex flex-wrap gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="flex min-w-48 flex-1 flex-col rounded-2xl border border-outline-variant bg-white p-4 data-card-shadow"
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <span className={`rounded-xl p-2 ${stat.bg}`}>
                      <Icon className={stat.tone} size={20} />
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-outline">
                      Today
                    </span>
                  </div>
                  <p className="mb-1 font-label-caps text-label-caps text-on-surface-variant">
                    {stat.label}
                  </p>
                  <h3 className="text-[28px] font-bold leading-none text-on-surface">
                    {stat.value}
                  </h3>
                </div>
              );
            })}
          </section>

          <section className="rounded-3xl border border-outline-variant bg-white p-6 data-card-shadow md:p-8">
            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="font-h3-desktop text-h3-desktop text-on-surface">
                  Commodity Compliance
                </h3>
                <p className="text-body-sm text-on-surface-variant">Latest monitoring results</p>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-outline-variant bg-surface-container-low px-3 py-2">
                <MdSearch className="text-outline" />
                <span className="text-body-sm text-on-surface-variant">Search commodity</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full table-fixed text-left">
                <thead>
                  <tr className="border-b border-outline-variant/30">
                    <th className="pb-3 text-[10px] font-label-caps uppercase tracking-[0.24em] text-outline">Commodity</th>
                    <th className="pb-3 text-[10px] font-label-caps uppercase tracking-[0.24em] text-outline">Store</th>
                    <th className="pb-3 text-[10px] font-label-caps uppercase tracking-[0.24em] text-outline">Region</th>
                    <th className="pb-3 text-[10px] font-label-caps uppercase tracking-[0.24em] text-outline">Price</th>
                    <th className="pb-3 text-[10px] font-label-caps uppercase tracking-[0.24em] text-outline">SRP</th>
                    <th className="pb-3 text-right text-[10px] font-label-caps uppercase tracking-[0.24em] text-outline">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                  {rows.map((row) => (
                    <tr key={row.commodity}>
                      <td className="py-4 font-semibold text-on-surface">{row.commodity}</td>
                      <td className="py-4 text-body-sm text-on-surface-variant">{row.store}</td>
                      <td className="py-4 text-body-sm text-on-surface-variant">{row.region}</td>
                      <td className="py-4 text-body-sm font-semibold text-on-surface">{row.price}</td>
                      <td className="py-4 text-body-sm text-on-surface-variant">{row.srp}</td>
                      <td className="py-4 text-right">
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${row.statusClass}`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
