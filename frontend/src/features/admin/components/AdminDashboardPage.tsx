"use client";

import { useEffect, useState, type ComponentType } from "react";
import { apiFetch } from "../../../lib/api";
import {
  MdOutlineInventory2,
  MdOutlineTrendingUp,
  MdOutlineStorefront,
  MdOutlineSell,
  MdOutlineLogin,
  MdOutlineReportProblem,
  MdOutlinePersonAdd,
  MdOutlineCheckCircle,
} from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { IoFilterOutline } from "react-icons/io5";
import { IoMdAdd, IoMdMore } from "react-icons/io";
import { LuDownload } from "react-icons/lu";

type DashboardStat = {
  label: string;
  value: string;
  meta?: string;
  icon: ComponentType<{ className?: string; size?: number }>;
  iconBg: string;
  iconColor: string;
  valueColor?: string;
  metaStyle?: string;
};

const initialStats: DashboardStat[] = [
  {
    label: "Total Commodities",
    value: "—",
    meta: "Loading...",
    icon: MdOutlineInventory2,
    iconBg: "bg-primary-container/10",
    iconColor: "text-primary",
  },
  {
    label: "Monitored Prices",
    value: "—",
    meta: "Loading...",
    icon: MdOutlineTrendingUp,
    iconBg: "bg-tertiary-container/10",
    iconColor: "text-tertiary",
  },
  {
    label: "Total Stores",
    value: "—",
    meta: "Loading...",
    icon: MdOutlineStorefront,
    iconBg: "bg-secondary-container/10",
    iconColor: "text-secondary",
  },
  {
    label: "Total Users",
    value: "—",
    meta: "Loading...",
    icon: FiUsers,
    iconBg: "bg-outline-variant/20",
    iconColor: "text-on-surface-variant",
  },
];

const activityItems = [
  {
    icon: MdOutlineSell,
    iconStyle: "bg-secondary-container text-on-secondary-container",
    title: "Rice (Regular Milled)",
    description: "price updated at SM Market, Manila.",
    time: "Just Now",
    change: "₱42.00 → ₱43.50",
  },
  {
    icon: MdOutlineLogin,
    iconStyle: "bg-surface-container-highest text-on-surface-variant",
    title: "Inspector Maria S.",
    description: "logged in from QC Field Office.",
    time: "15 Minutes Ago",
  },
  {
    icon: MdOutlineReportProblem,
    iconStyle: "bg-error-container/20 text-error",
    title: "SRP Violation",
    description: "flagged: Store #042 - Onion (Red).",
    time: "1 Hour Ago",
  },
  {
    icon: MdOutlinePersonAdd,
    iconStyle: "bg-primary-container/10 text-primary",
    title: "2 New Retailers",
    description: "approved for price submission.",
    time: "2 Hours Ago",
  },
];

const watchlistRows = [
  {
    initials: "R",
    commodity: "Rice (Regular Milled)",
    currentAvg: "₱43.20",
    srp: "₱41.00",
    trend: "+5.3%",
    trendColor: "text-error",
    trendIcon: MdOutlineTrendingUp,
    status: "Violation",
    statusStyle: "bg-error text-on-error",
  },
  {
    initials: "S",
    commodity: "Sugar (Refined)",
    currentAvg: "₱92.50",
    srp: "₱100.00",
    trend: "-1.2%",
    trendColor: "text-primary",
    trendIcon: MdOutlineTrendingUp,
    status: "Compliant",
    statusStyle: "border border-outline text-outline",
  },
  {
    initials: "O",
    commodity: "Onion (Red)",
    currentAvg: "₱180.00",
    srp: "₱170.00",
    trend: "+12.4%",
    trendColor: "text-error",
    trendIcon: MdOutlineTrendingUp,
    status: "Violation",
    statusStyle: "bg-error text-on-error",
  },
  {
    initials: "C",
    commodity: "Cooking Oil",
    currentAvg: "₱65.00",
    srp: "₱65.00",
    trend: "Stable",
    trendColor: "text-on-surface-variant",
    trendIcon: MdOutlineTrendingUp,
    status: "Compliant",
    statusStyle: "border border-outline text-outline",
  },
];

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStat[]>(initialStats);

  useEffect(() => {
    async function loadDashboardStats() {
      try {
        const [commodityResponse, storeResponse, userResponse, priceRecordResponse] = await Promise.all([
          apiFetch<{ status: string; data: unknown[] }>("/api/commodities"),
          apiFetch<{ status: string; data: unknown[] }>("/api/stores"),
          apiFetch<unknown[]>("/api/users"),
          apiFetch<unknown[]>("/api/price-records"),
        ]);

        const totalCommodities = String(commodityResponse.data.length);
        const totalStores = String(storeResponse.data.length);
        const totalUsers = String(userResponse.length);
        const monitoredPrices = String(0);

        setStats([
          {
            label: "Total Commodities",
            value: totalCommodities,
            meta: `${totalCommodities} tracked`,
            icon: MdOutlineInventory2,
            iconBg: "bg-primary-container/10",
            iconColor: "text-primary",
          },
          {
            label: "Monitored Prices",
            value: monitoredPrices,
            meta: "Recent submissions",
            icon: MdOutlineTrendingUp,
            iconBg: "bg-tertiary-container/10",
            iconColor: "text-tertiary",
          },
          {
            label: "Total Stores",
            value: totalStores,
            meta: "Monitored locations",
            icon: MdOutlineStorefront,
            iconBg: "bg-secondary-container/10",
            iconColor: "text-secondary",
          },
          {
            label: "Total Users",
            value: totalUsers,
            meta: "Active accounts",
            icon: FiUsers,
            iconBg: "bg-outline-variant/20",
            iconColor: "text-on-surface-variant",
          },
        ]);
      } catch (error) {
        console.error("Failed to load dashboard stats", error);
      }
    }

    loadDashboardStats();
  }, []);

  return (
    <main className="min-h-screen lg:ml-72">
      <section className="px-container-margin-mobile py-12 md:px-container-margin-desktop">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="font-h1-desktop text-h1-desktop text-on-surface">
                Good morning, Admin User
              </h2>
              <p className="mt-1 font-body-lg text-on-surface-variant">
                Here is the market overview for today, October 24, 2023.
              </p>
            </div>
            <button className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-on-primary shadow-sm transition-all hover:shadow-md">
              <IoMdAdd />
              New Price Entry
            </button>
          </div>

          <section className="flex flex-wrap gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex min-w-52.5 flex-1 flex-col rounded-2xl border border-outline-variant bg-white p-6 data-card-shadow"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className={`rounded-xl p-2 ${stat.iconBg}`}>
                    <stat.icon className={stat.iconColor} size={24} />
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
            ))}
          </section>

          <section className="flex flex-col gap-6 xl:flex-row">
            <div className="flex min-h-105 flex-1 flex-col rounded-3xl border border-outline-variant bg-white p-6 data-card-shadow md:p-8">
              <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <h4 className="font-h3-desktop text-h3-desktop text-on-surface">
                    Price Trend Analytics
                  </h4>
                  <p className="text-body-sm text-on-surface-variant">
                    Market Average vs. SRP over 30 days
                  </p>
                </div>
                <div className="flex items-center gap-1 rounded-xl border border-outline-variant bg-surface-container-low p-1">
                  {['30 Days', '90 Days', '1 Year'].map((item, index) => (
                    <button
                      key={item}
                      className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                        index === 0
                          ? "bg-white text-primary shadow-sm"
                          : "text-on-surface-variant hover:text-on-surface"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              <div className="relative flex-1">
                <svg viewBox="0 0 800 320" className="h-full w-full">
                  <defs>
                    <linearGradient id="lineGradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#004ac6" stopOpacity="0.12" />
                      <stop offset="100%" stopColor="#004ac6" stopOpacity="0.02" />
                    </linearGradient>
                  </defs>
                  {[0, 1, 2, 3].map((row) => (
                    <line
                      key={row}
                      x1="0"
                      x2="800"
                      y1={40 + row * 60}
                      y2={40 + row * 60}
                      stroke="#e1e2ed"
                      strokeDasharray="6 6"
                    />
                  ))}
                  <path
                    d="M0 230 C80 220, 120 210, 160 170 S260 120, 320 130 S420 170, 480 150 S600 90, 640 110 S730 130, 800 80"
                    fill="none"
                    stroke="#737686"
                    strokeWidth="3"
                    strokeDasharray="8 6"
                  />
                  <path
                    d="M0 220 C80 210, 120 180, 160 150 S260 100, 320 110 S420 130, 480 120 S600 70, 640 80 S730 110, 800 50"
                    fill="url(#lineGradient)"
                    stroke="#004ac6"
                    strokeWidth="3"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                  <path
                    d="M0 220 C80 210, 120 180, 160 150 S260 100, 320 110 S420 130, 480 120 S600 70, 640 80 S730 110, 800 50"
                    fill="none"
                    stroke="#004ac6"
                    strokeWidth="3"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            <div className="flex min-h-105 w-full flex-col rounded-3xl border border-outline-variant bg-white p-6 data-card-shadow md:p-8 xl:w-90">
              <div className="mb-6 flex items-center justify-between">
                <h4 className="font-h3-desktop text-h3-desktop text-on-surface">
                  Recent Activity
                </h4>
                <IoMdMore />
              </div>
              <div className="flex-1 space-y-6">
                {activityItems.map((item) => (
                  <div key={item.time} className="flex items-start gap-4">
                    <div
                      className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${item.iconStyle}`}
                    >
                      <item.icon size={18} />
                    </div>
                    <div>
                      <p className="text-body-sm text-on-surface">
                        {item.title.startsWith("2 New") || item.title.includes("SRP") ? (
                          <>
                            {item.title === "SRP Violation" ? (
                              <>
                                New <span className="font-bold text-error">{item.title}</span>{" "}
                              </>
                            ) : (
                              <span className="font-bold">{item.title}</span>
                            )}
                            {item.description}
                          </>
                        ) : (
                          <>
                            <span className="font-bold">{item.title}</span> {item.description}
                          </>
                        )}
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-outline">
                          {item.time}
                        </span>
                        {item.change ? (
                          <span className="text-xs font-bold text-primary">{item.change}</span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-8 w-full rounded-xl border border-primary/20 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary/5">
                View All Activity
              </button>
            </div>

            <div className="rounded-3xl border border-outline-variant bg-white p-6 data-card-shadow md:p-8">
              <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <h4 className="font-h3-desktop text-h3-desktop text-on-surface">
                  Watchlist Compliance
                </h4>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1.5 rounded-xl border border-outline-variant px-3 py-2 text-xs font-semibold text-on-surface-variant">
                    <IoFilterOutline />
                    Filter
                  </button>
                  <button className="flex items-center gap-1.5 rounded-xl border border-outline-variant px-3 py-2 text-xs font-semibold text-on-surface-variant">
                    <LuDownload />
                    Export
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-left">
                  <thead>
                    <tr className="border-b border-outline-variant/30">
                      <th className="pb-4 text-[10px] font-semibold uppercase tracking-wide text-outline">Commodity</th>
                      <th className="pb-4 text-[10px] font-semibold uppercase tracking-wide text-outline">Current Avg</th>
                      <th className="pb-4 text-[10px] font-semibold uppercase tracking-wide text-outline">SRP Limit</th>
                      <th className="pb-4 text-[10px] font-semibold uppercase tracking-wide text-outline">Trend (7d)</th>
                      <th className="pb-4 text-right text-[10px] font-semibold uppercase tracking-wide text-outline">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/20">
                    {watchlistRows.map((row) => (
                      <tr key={row.commodity}>
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-container-high font-bold text-primary">
                              {row.initials}
                            </div>
                            <span className="font-semibold text-on-surface">{row.commodity}</span>
                          </div>
                        </td>
                        <td className="py-4 text-sm font-semibold text-on-surface">{row.currentAvg}</td>
                        <td className="py-4 text-sm text-on-surface-variant">{row.srp}</td>
                        <td className="py-4">
                          <div className={`flex items-center gap-1 ${row.trendColor}`}>
                            {row.trendIcon ? <row.trendIcon size={14} /> : null}
                            <span className="text-xs font-bold">{row.trend}</span>
                          </div>
                        </td>
                        <td className="py-4 text-right">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold ${row.statusStyle}`}
                          >
                            {row.status === "Compliant" ? (
                              <>
                                <MdOutlineCheckCircle className="mr-1" size={12} />
                                Compliant
                              </>
                            ) : (
                              row.status
                            )}
                          </span>
                        </td>
                      </tr>
                    ))}
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
