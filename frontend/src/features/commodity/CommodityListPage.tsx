"use client";

import { useEffect, useMemo, useState, type ComponentType } from "react";
import {
  MdError,
  MdKeyboardArrowDown,
  MdLocalDining,
  MdLocalGroceryStore,
  MdOutlineChevronLeft,
  MdOutlineChevronRight,
  MdSearch,
  MdTrendingDown,
  MdVerifiedUser,
} from "react-icons/md";
import { getPublicCommodities, type PublicCommodityItem } from "./api/commodity.api";

interface CommodityRow {
  id: string;
  name: string;
  category: string;
  commodityStatus: string;
  current: string;
  srp: string;
  status: string;
  statusTone: string;
  lastUpdated: string;
  storeName: string;
  municipality: string;
  icon: ComponentType<{ className?: string; size?: number }>;
  iconBg: string;
}

function formatCurrency(value: number | null) {
  if (value == null) {
    return "N/A";
  }

  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 2,
  }).format(value);
}

function formatLastUpdated(value: string | null) {
  if (!value) {
    return "Recently updated";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Recently updated";
  }

  return new Intl.DateTimeFormat("en-PH", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function getStatusTone(status: string) {
  switch (status) {
    case "Above SRP":
      return "bg-error/10 text-error";
    case "Below SRP":
      return "bg-success/10 text-success";
    case "Compliant":
      return "bg-primary/10 text-primary";
    default:
      return "bg-surface-container/10 text-on-surface-variant";
  }
}

function mapCommoditiesToRows(commodities: PublicCommodityItem[]): CommodityRow[] {
  return commodities.map((commodity, index) => ({
    id: commodity.id,
    name: commodity.name,
    category: commodity.category,
    commodityStatus: commodity.status || "Unknown",
    current: formatCurrency(commodity.currentPrice),
    srp: formatCurrency(commodity.srpPrice),
    status: commodity.complianceStatus || "Unknown",
    statusTone: getStatusTone(commodity.complianceStatus || "Unknown"),
    lastUpdated: formatLastUpdated(commodity.lastUpdatedAt),
    storeName: commodity.storeName || "N/A",
    municipality: commodity.storeLocation || "N/A",
    icon: index % 2 === 0 ? MdLocalDining : MdLocalGroceryStore,
    iconBg: "bg-primary-container/10 text-primary",
  }));
}

export default function CommodityListPage() {
  const [allRows, setAllRows] = useState<CommodityRow[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [municipalityFilter, setMunicipalityFilter] = useState("All");
  const [storeFilter, setStoreFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pageSize = 5;

  const categories = useMemo(() => {
    const values = allRows
      .map((row) => row.category)
      .filter((value): value is string => Boolean(value))
      .sort();

    return ["All", ...Array.from(new Set(values))];
  }, [allRows]);

  const municipalities = useMemo(() => {
    const values = allRows
      .map((row) => row.municipality)
      .filter((value): value is string => value !== "N/A" && Boolean(value))
      .sort();

    return ["All", ...Array.from(new Set(values))];
  }, [allRows]);

  const stores = useMemo(() => {
    const values = allRows
      .map((row) => row.storeName)
      .filter((value): value is string => value !== "N/A" && Boolean(value))
      .sort();

    return ["All", ...Array.from(new Set(values))];
  }, [allRows]);

  const tableRows = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return allRows.filter((row) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [row.name, row.category, row.storeName, row.municipality, row.commodityStatus, row.status].some((value) =>
          value.toLowerCase().includes(normalizedSearch),
        );

      const matchesCategory = categoryFilter === "All" || row.category === categoryFilter;
      const matchesMunicipality = municipalityFilter === "All" || row.municipality === municipalityFilter;
      const matchesStore = storeFilter === "All" || row.storeName === storeFilter;

      return matchesSearch && matchesCategory && matchesMunicipality && matchesStore;
    });
  }, [allRows, categoryFilter, municipalityFilter, searchTerm, storeFilter]);

  const totalPages = Math.max(1, Math.ceil(tableRows.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const pagedRows = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * pageSize;
    return tableRows.slice(startIndex, startIndex + pageSize);
  }, [safeCurrentPage, tableRows]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, categoryFilter, municipalityFilter, storeFilter]);

  useEffect(() => {
    async function loadCommodities() {
      try {
        const commodities = await getPublicCommodities();
        setAllRows(mapCommoditiesToRows(commodities));
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
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-[11px] font-medium uppercase tracking-wide text-outline">Filters:</span>
            <label className="relative flex items-center gap-1 overflow-hidden rounded-full bg-surface-container-high px-3 py-1.5 text-xs text-on-surface transition-colors hover:bg-surface-container-highest">
              <span className="whitespace-nowrap">{categoryFilter === "All" ? "Category: All" : `Category: ${categoryFilter}`}</span>
              <MdKeyboardArrowDown />
              <select
                className="absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none opacity-0"
                value={categoryFilter}
                onChange={(event) => setCategoryFilter(event.target.value)}
                aria-label="Filter by category"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "All" ? "All categories" : category}
                  </option>
                ))}
              </select>
            </label>
            <label className="relative flex items-center gap-1 overflow-hidden rounded-full bg-surface-container-high px-3 py-1.5 text-xs text-on-surface transition-colors hover:bg-surface-container-highest">
              <span className="whitespace-nowrap">{municipalityFilter === "All" ? "Municipality: All" : `Municipality: ${municipalityFilter}`}</span>
              <MdKeyboardArrowDown />
              <select
                className="absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none opacity-0"
                value={municipalityFilter}
                onChange={(event) => setMunicipalityFilter(event.target.value)}
                aria-label="Filter by municipality"
              >
                {municipalities.map((municipality) => (
                  <option key={municipality} value={municipality}>
                    {municipality === "All" ? "All municipalities" : municipality}
                  </option>
                ))}
              </select>
            </label>
            <label className="relative flex items-center gap-1 overflow-hidden rounded-full bg-surface-container-high px-3 py-1.5 text-xs text-on-surface transition-colors hover:bg-surface-container-highest">
              <span className="whitespace-nowrap">{storeFilter === "All" ? "Store: All" : `Store: ${storeFilter}`}</span>
              <MdKeyboardArrowDown />
              <select
                className="absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none opacity-0"
                value={storeFilter}
                onChange={(event) => setStoreFilter(event.target.value)}
                aria-label="Filter by store"
              >
                {stores.map((store) => (
                  <option key={store} value={store}>
                    {store === "All" ? "All stores" : store}
                  </option>
                ))}
              </select>
            </label>
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
                  <th className="px-3 py-3 text-[10px] font-semibold uppercase tracking-wide text-outline">Store</th>
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
                    <td colSpan={7} className="py-12 text-center text-sm text-on-surface-variant">
                      Loading commodities...
                    </td>
                  </tr>
                ) : tableRows.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-sm text-on-surface-variant">
                      No commodities found.
                    </td>
                  </tr>
                ) : (
                  pagedRows.map((row) => {
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
                                {row.storeName !== "N/A" ? `${row.storeName}` : "No recent store data"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3 text-sm text-on-surface-variant">{row.storeName !== "N/A" ? row.storeName : "No store data"}</td>
                        <td className="px-3 py-3">
                          <span className="rounded-md bg-surface-variant px-2.5 py-1 text-xs text-on-surface-variant">{row.category}</span>
                        </td>
                        <td className="px-3 py-3 text-sm text-on-surface-variant">{row.commodityStatus}</td>
                        <td className="px-3 py-3 text-sm font-semibold text-on-surface">{row.current}</td>
                        <td className="px-3 py-3 text-sm text-outline">{row.srp}</td>
                        <td className="px-3 py-3">
                          <div className="flex flex-col gap-1">
                            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide shadow-sm ${row.statusTone}`}>
                              {row.status.includes("Above") ? <MdError size={12} /> : row.status === "Compliant" ? <MdVerifiedUser size={12} /> : row.status === "Below SRP" ? <MdTrendingDown size={12} /> : <MdError size={12} />}
                              {row.status}
                            </span>
                            <span className="text-[11px] text-outline">Updated {row.lastUpdated}</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-outline-variant bg-surface-container-low px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-on-surface-variant">
            Showing {tableRows.length === 0 ? 0 : `${(safeCurrentPage - 1) * pageSize + 1}-${Math.min(safeCurrentPage * pageSize, tableRows.length)}`} of {tableRows.length} commodities
          </p>
          <div className="flex items-center gap-1">
            <button
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-outline-variant bg-surface-container-lowest text-outline transition-colors hover:bg-surface-container-high disabled:cursor-not-allowed disabled:opacity-50"
              disabled={safeCurrentPage === 1}
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            >
              <MdOutlineChevronLeft size={20} />
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                className={`flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-semibold transition-colors ${
                  safeCurrentPage === page
                    ? "border-primary bg-primary text-on-primary"
                    : "border-outline-variant bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high"
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

            <button
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-outline-variant bg-surface-container-lowest text-outline transition-colors hover:bg-surface-container-high disabled:cursor-not-allowed disabled:opacity-50"
              disabled={safeCurrentPage === totalPages}
              onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
            >
              <MdOutlineChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
