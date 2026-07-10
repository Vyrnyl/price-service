"use client";

import { useEffect, useState, type ComponentType } from "react";
import { apiFetch } from "../../../lib/api";
import {
  MdOutlineInventory2,
  MdOutlineTrendingUp,
  MdOutlineStorefront,
  MdOutlinePersonAdd,
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

type ActivityItem = {
  title: string;
  description: string;
  time: string;
  icon: ComponentType<{ className?: string; size?: number }>;
  iconStyle: string;
  change?: string;
};

type StoreComplianceRow = {
  id: string;
  name: string;
  location: string;
  priceRecordCount: number;
  lastUpdated: string;
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

function formatRelativeTime(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Recently updated";
  }

  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if (diffMinutes < 1) {
    return "Just now";
  }

  if (diffMinutes < 60) {
    return `${diffMinutes} min ago`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours} hr ago`;
  }

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStat[]>(initialStats);
  const [activityItems, setActivityItems] = useState<ActivityItem[]>([]);
  const [storeComplianceRows, setStoreComplianceRows] = useState<StoreComplianceRow[]>([]);

  useEffect(() => {
    async function loadDashboardStats() {
      try {
        const [commodityResponse, storeResponse, userResponse] = await Promise.all([
          apiFetch<{ status: string; data: unknown[] }>('/api/commodities'),
          apiFetch<{ status: string; data: unknown[] }>('/api/stores'),
          apiFetch<unknown[]>('/api/users'),
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

  useEffect(() => {
    async function loadActivityFeed() {
      try {
        const [usersResponse, commoditiesResponse, srpsResponse] = await Promise.all([
          apiFetch<Array<{ id: string; name: string; createdAt?: string }>>("/api/users"),
          apiFetch<{ status: string; data: Array<{ id: string; name: string; createdAt?: string }> }>("/api/commodities"),
          apiFetch<{ status: string; data: Array<{ id: string; price?: number | string; effectiveDate?: string; createdAt?: string; commodity?: { name?: string } }> }>("/api/srps"),
        ]);

        const latestUser = [...usersResponse]
          .sort((a, b) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime())[0] ?? null;
        const latestCommodity = [...commoditiesResponse.data]
          .sort((a, b) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime())[0] ?? null;
        const latestSrp = [...srpsResponse.data]
          .sort((a, b) => new Date(b.effectiveDate ?? b.createdAt ?? 0).getTime() - new Date(a.effectiveDate ?? a.createdAt ?? 0).getTime())[0] ?? null;

        const nextItems: ActivityItem[] = [];

        if (latestUser) {
          nextItems.push({
            icon: MdOutlinePersonAdd,
            iconStyle: "bg-primary-container/10 text-primary",
            title: "New user added",
            description: `${latestUser.name} joined as a ${latestUser.id ? "new account" : "user"}`,
            time: formatRelativeTime(latestUser.createdAt ?? new Date().toISOString()),
          });
        }

        if (latestCommodity) {
          nextItems.push({
            icon: MdOutlineInventory2,
            iconStyle: "bg-secondary-container text-on-secondary-container",
            title: "Commodity added",
            description: `${latestCommodity.name} was added to the system`,
            time: formatRelativeTime(latestCommodity.createdAt ?? new Date().toISOString()),
          });
        }

        if (latestSrp) {
          nextItems.push({
            icon: MdOutlineTrendingUp,
            iconStyle: "bg-tertiary-container/10 text-tertiary",
            title: "SRP updated",
            description: `${latestSrp.commodity?.name ?? "Commodity"} now has an SRP of ₱${Number(latestSrp.price ?? 0).toFixed(2)}`,
            time: formatRelativeTime(latestSrp.effectiveDate ?? latestSrp.createdAt ?? new Date().toISOString()),
            change: `₱${Number(latestSrp.price ?? 0).toFixed(2)}`,
          });
        }

        setActivityItems(nextItems);
      } catch (error) {
        console.error("Failed to load activity feed", error);
      }
    }

    loadActivityFeed();
  }, []);

  useEffect(() => {
    async function loadStoreComplianceData() {
      try {
        const [storesResponse, priceRecordsResponse] = await Promise.all([
          apiFetch<{ status: string; data: Array<{ id: string; name: string; location?: string; createdAt?: string }> }>('/api/stores'),
          apiFetch<{ status: string; data: Array<{ id: string; storeId?: string; store?: { name?: string }; price?: number | string; dateAndTime?: string; createdAt?: string; status?: string }> }>('/api/price-records'),
        ]);

        const recordsByStore = new Map<string, Array<{ createdAt?: string; dateAndTime?: string; price?: number | string; status?: string }>>();

        for (const record of priceRecordsResponse.data) {
          const storeId = record.storeId ?? '';
          if (!recordsByStore.has(storeId)) {
            recordsByStore.set(storeId, []);
          }
          recordsByStore.get(storeId)?.push(record);
        }

        const rows = storesResponse.data
          .map((store) => {
            const records = recordsByStore.get(store.id) ?? [];
            const latestRecord = [...records].sort((a, b) => {
              const aTime = new Date(a.dateAndTime ?? a.createdAt ?? 0).getTime();
              const bTime = new Date(b.dateAndTime ?? b.createdAt ?? 0).getTime();
              return bTime - aTime;
            })[0];

            const lastUpdated = latestRecord?.dateAndTime || latestRecord?.createdAt || store.createdAt || '';

            return {
              id: store.id,
              name: store.name,
              location: store.location ?? '—',
              priceRecordCount: records.length,
              lastUpdated,
            };
          })
          .sort((a, b) => b.priceRecordCount - a.priceRecordCount || a.name.localeCompare(b.name));

        setStoreComplianceRows(rows);
      } catch (error) {
        console.error('Failed to load store compliance data', error);
      }
    }

    loadStoreComplianceData();
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

          <section className="grid gap-6 xl:grid-cols-[minmax(320px,0.8fr)_minmax(0,1.2fr)]">
            <div className="flex min-h-105 w-full flex-col rounded-3xl border border-outline-variant bg-white p-6 data-card-shadow md:p-8">
              <div className="mb-6 flex items-center justify-between">
                <h4 className="font-h3-desktop text-h3-desktop text-on-surface">
                  Recent Activity
                </h4>
                <IoMdMore />
              </div>
              <div className="flex-1 space-y-6">
                {activityItems.map((item) => (
                  <div key={`${item.title}-${item.time}`} className="flex items-start gap-4">
                    <div
                      className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${item.iconStyle}`}
                    >
                      <item.icon size={18} />
                    </div>
                    <div>
                      <p className="text-body-sm text-on-surface">
                        <span className="font-semibold">{item.title}</span> {item.description}
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
                  Store Compliance
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
                      <th className="pb-4 text-[10px] font-semibold uppercase tracking-wide text-outline">Store Name</th>
                      <th className="pb-4 text-[10px] font-semibold uppercase tracking-wide text-outline">Price Records</th>
                      <th className="pb-4 text-[10px] font-semibold uppercase tracking-wide text-outline">Last Updated</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/20">
                    {storeComplianceRows.map((row) => (
                      <tr key={row.id}>
                        <td className="py-4">
                          <div className="flex flex-col">
                            <span className="font-semibold text-on-surface">{row.name}</span>
                            <span className="text-sm text-on-surface-variant">{row.location}</span>
                          </div>
                        </td>
                        <td className="py-4 text-sm font-semibold text-on-surface">{row.priceRecordCount}</td>
                        <td className="py-4 text-sm text-on-surface-variant">
                          {row.lastUpdated ? new Date(row.lastUpdated).toLocaleDateString() : '—'}
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
