"use client";

import { useEffect, useState, type ComponentType } from "react";
import {
  MdError,
  MdKeyboardArrowDown,
  MdLocalDining,
  MdLocalGroceryStore,
  MdNotificationsActive,
  MdSearch,
  MdTrendingDown,
  MdVerifiedUser,
} from "react-icons/md";
import { getCommodities, type CommodityItem } from "./api/commodity.api";

interface CommodityRow {
  id: string;
  name: string;
  category: string;
  commodityStatus: string;
  current: string;
  srp: string;
  status: string;
  statusTone: string;
  icon: ComponentType<{ className?: string; size?: number }>;
  iconBg: string;
}

const activityFeed = [
  {
    dot: "bg-error",
    text: (
      <>
        <span className="font-bold">Rice (Well-milled)</span> price increased to{" "}
        <span className="font-bold text-error">₱58.00</span> at ABC Supermarket,
        exceeding SRP.
      </>
    ),
    time: "2 HOURS AGO",
  },
  {
    dot: "bg-[#00897B]",
    text: (
      <>
        Price inspection completed at <span className="font-bold">Virac Public Market</span>.
        All basic commodities compliant.
      </>
    ),
    time: "5 HOURS AGO",
  },
  {
    dot: "bg-outline",
    text: (
      <>
        <span className="font-bold">DTI Regional Office</span> issued updated SRP guidelines
        for Q4 2024.
      </>
    ),
    time: "1 DAY AGO",
  },
];

function mapCommoditiesToRows(commodities: CommodityItem[]): CommodityRow[] {
  return commodities.map((commodity, index) => ({
    id: commodity.id,
    name: commodity.name,
    category: commodity.category,
    commodityStatus: commodity.status || "Unknown",
    current: "N/A",
    srp: "_",
    status: "Unknown",
    statusTone: "bg-surface-container/10 text-on-surface-variant",
    icon: index % 2 === 0 ? MdLocalDining : MdLocalGroceryStore,
    iconBg: "bg-primary-container/10 text-primary",
  }));
}

export default function CommodityListPage() {
  const [tableRows, setTableRows] = useState<CommodityRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCommodities() {
      try {
        const commodities = await getCommodities();
        setTableRows(mapCommoditiesToRows(commodities));
      } catch {
        setError("Unable to load commodities. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    void loadCommodities();
  }, []);

  return (
    <main className="flex-1 overflow-y-auto overflow-x-hidden p-container-margin-mobile md:p-container-margin-desktop lg:ml-72">
      <section className="space-y-4 pb-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-on-surface md:text-3xl">
              Commodity Monitoring
            </h1>
            <p className="mt-1 text-sm text-on-surface-variant md:text-base">
              Real-time market price surveillance for Catanduanes Province.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-xl border border-outline-variant bg-surface-container-lowest p-3 shadow-sm md:flex-row md:items-center">
          <div className="relative w-full md:max-w-xs">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
            <input
              className="w-full rounded-xl border border-outline-variant bg-surface py-2.5 pl-10 pr-3 text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="Search Commodity..."
              type="text"
              disabled
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-[11px] font-medium uppercase tracking-wide text-outline">Filters:</span>
            <button className="flex items-center gap-1 rounded-full bg-surface-container-high px-3 py-1.5 text-xs text-on-surface transition-colors hover:bg-surface-container-highest">
              Category: All
              <MdKeyboardArrowDown />
            </button>
            <button className="flex items-center gap-1 rounded-full bg-surface-container-high px-3 py-1.5 text-xs text-on-surface transition-colors hover:bg-surface-container-highest">
              Municipality: Virac
              <MdKeyboardArrowDown />
            </button>
            <button className="flex items-center gap-1 rounded-full bg-surface-container-high px-3 py-1.5 text-xs text-on-surface transition-colors hover:bg-surface-container-highest">
              Store: ABC Supermarket
              <MdKeyboardArrowDown />
            </button>
          </div>
        </div>
      </section>

      <div className="space-y-4">
        {error ? (
          <div className="rounded-xl border border-error bg-error/10 p-4 text-sm text-error">
            {error}
          </div>
        ) : null}

        <div className="overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-outline-variant bg-surface-container-low">
                  <th className="px-3 py-3 text-[10px] font-semibold uppercase tracking-wide text-outline">Commodity</th>
                  <th className="px-3 py-3 text-[10px] font-semibold uppercase tracking-wide text-outline">Category</th>
                  <th className="px-3 py-3 text-[10px] font-semibold uppercase tracking-wide text-outline">Status</th>
                  <th className="px-3 py-3 text-[10px] font-semibold uppercase tracking-wide text-outline">Current</th>
                  <th className="px-3 py-3 text-[10px] font-semibold uppercase tracking-wide text-outline">SRP</th>
                  <th className="px-3 py-3 text-[10px] font-semibold uppercase tracking-wide text-outline">Compliance</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-sm text-on-surface-variant">
                      Loading commodities...
                    </td>
                  </tr>
                ) : tableRows.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-sm text-on-surface-variant">
                      No commodities found.
                    </td>
                  </tr>
                ) : (
                  tableRows.map((row, index) => {
                    const Icon = row.icon;
                    return (
                      <tr
                        key={row.id}
                        className="border-b border-outline-variant transition-colors last:border-b-0 hover:bg-surface-container"
                      >
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-3">
                            <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${row.iconBg}`}>
                              <Icon className="text-base" />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-on-surface">{row.name}</div>
                              <div className="text-[11px] text-outline">
                                Last updated: {index === 0 ? "2h ago" : index === 1 ? "5h ago" : index === 2 ? "1d ago" : "3h ago"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <span className="rounded-md bg-surface-variant px-2.5 py-1 text-xs text-on-surface-variant">{row.category}</span>
                        </td>
                        <td className="px-3 py-3 text-sm text-on-surface-variant">{row.commodityStatus}</td>
                        <td className="px-3 py-3 text-sm font-semibold text-on-surface">{row.current}</td>
                        <td className="px-3 py-3 text-sm text-outline">{row.srp}</td>
                        <td className="px-3 py-3">
                          <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide shadow-sm ${row.statusTone}`}>
                            {row.status.includes("Above") ? <MdError size={12} /> : row.status === "Compliant" ? <MdVerifiedUser size={12} /> : row.status === "Below SRP" ? <MdTrendingDown size={12} /> : <MdError size={12} />}
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-xl border border-outline-variant bg-surface-container-low p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-on-surface">
              <MdNotificationsActive className="text-primary" />
              Latest Activity
            </h3>
            <a className="text-xs font-medium text-primary hover:underline" href="#">
              View All
            </a>
          </div>
          <div className="space-y-3">
            {activityFeed.map((item) => (
              <div key={item.time} className="flex gap-3 rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-3">
                <div className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${item.dot}`} />
                <div>
                  <p className="text-sm leading-snug text-on-surface">{item.text}</p>
                  <span className="mt-1 block text-[11px] text-outline">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
