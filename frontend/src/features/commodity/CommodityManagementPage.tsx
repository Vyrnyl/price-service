"use client";

import { useEffect, useState, type ComponentType } from "react";
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
  MdOutlineChevronLeft,
  MdOutlineChevronRight,
  MdOutlineInventory2,
  MdOutlineStorefront,
  MdOutlineTrendingUp,
  MdOutlineWarning,
  MdSearch,
  MdUnarchive,
} from "react-icons/md";
import AddCommodityDialog from "./components/AddCommodityDialog";
import {
  createCommodity,
  getCommodities,
  updateCommodity,
  type CommodityItem,
  type CreateCommodityPayload,
} from "./api/commodity.api";
import type { CommodityStatus } from "./commodity.schema";

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

interface CommodityRow {
  id: string;
  name: string;
  category: string;
  status: CommodityStatus;
  srp: string;
  statusClass: string;
  icon: ComponentType<{ className?: string; size?: number }>;
  iconBg: string;
}

function mapCommodityToRow(item: CommodityItem, index: number): CommodityRow {
  return {
    id: item.id,
    name: item.name,
    category: item.category,
    status: item.status,
    srp: "_",
    statusClass: "border border-primary text-primary",
    icon: index % 2 === 0 ? MdBakeryDining : MdOutlineStorefront,
    iconBg: index % 2 === 0 ? "bg-primary-fixed text-primary" : "bg-secondary-container text-secondary",
  };
}

function mapCommoditiesToRows(commodities: CommodityItem[]): CommodityRow[] {
  return commodities.map(mapCommodityToRow);
}

export default function CommodityManagementPage() {
  const [commodityRows, setCommodityRows] = useState<CommodityRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingCommodity, setEditingCommodity] = useState<CommodityItem | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "Active" | "Inactive">("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadCommodities() {
      try {
        const commodities = await getCommodities();
        setCommodityRows(mapCommoditiesToRows(commodities));
      } catch {
        setError("Unable to load commodity list.");
      } finally {
        setIsLoading(false);
      }
    }

    void loadCommodities();
  }, []);

  const handleSaveCommodity = async (data: CreateCommodityPayload) => {
    setFormError(null);
    setFormSuccess(null);
    setSubmitLoading(true);

    try {
      if (editingCommodity) {
        const updatedCommodity = await updateCommodity(editingCommodity.id, data);
        setCommodityRows((prev) =>
          prev.map((row, index) =>
            row.id === updatedCommodity.id ? mapCommodityToRow(updatedCommodity, index) : row,
          ),
        );
        setFormSuccess("Commodity updated successfully.");
      } else {
        const createdCommodity = await createCommodity(data);
        setCommodityRows((prev) => [mapCommodityToRow(createdCommodity, prev.length), ...prev]);
        setFormSuccess("Commodity created successfully.");
      }

      setFormOpen(false);
      setEditingCommodity(null);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setFormError(error.message ?? "Unable to save commodity.");
      } else {
        setFormError("Unable to save commodity.");
      }
      console.error("Failed to save commodity", error);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleEditCommodity = (commodity: CommodityItem) => {
    setEditingCommodity(commodity);
    setFormError(null);
    setFormSuccess(null);
    setFormOpen(true);
  };

  const totalListed = commodityRows.length;
  const activeCount = commodityRows.filter((row) => row.status === "Active").length;
  const categoriesCount = new Set(commodityRows.map((row) => row.category)).size;

  const summaryCards = [
    {
      label: "Total Listed",
      value: String(totalListed),
      meta: "Live commodity count",
      icon: MdOutlineInventory2,
      iconBg: "bg-primary-container/10",
      iconColor: "text-primary",
    },
    {
      label: "Active",
      value: String(activeCount),
      meta: "Currently active",
      icon: MdOutlineTrendingUp,
      iconBg: "bg-tertiary-container/10",
      iconColor: "text-tertiary",
    },
    {
      label: "Categories",
      value: String(categoriesCount),
      meta: "Unique categories",
      icon: MdKitchen,
      iconBg: "bg-secondary-container/10",
      iconColor: "text-secondary",
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
  ];

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const filteredCommodityRows = commodityRows.filter((row) => {
    const normalizedRow = `${row.name} ${row.category} ${row.status}`.toLowerCase();
    const matchesSearch = normalizedRow.includes(normalizedSearchTerm);
    const matchesStatus = statusFilter === "ALL" || row.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const PAGE_SIZE = 5;
  const totalPages = Math.max(1, Math.ceil(filteredCommodityRows.length / PAGE_SIZE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedCommodityRows = filteredCommodityRows.slice(
    (safeCurrentPage - 1) * PAGE_SIZE,
    (safeCurrentPage - 1) * PAGE_SIZE + PAGE_SIZE,
  );

  const startIndex = filteredCommodityRows.length === 0 ? 0 : (safeCurrentPage - 1) * PAGE_SIZE + 1;
  const endIndex = Math.min(startIndex + paginatedCommodityRows.length - 1, filteredCommodityRows.length);

  return (
    <main className="min-h-screen lg:ml-72">
      <section className="px-container-margin-mobile py-12 md:px-container-margin-desktop">
        <div className="mx-auto max-w-6xl space-y-6">
          <AddCommodityDialog
            open={formOpen}
            mode={editingCommodity ? "edit" : "create"}
            defaultValues={
              editingCommodity
                ? {
                    name: editingCommodity.name,
                    category: editingCommodity.category,
                    status: editingCommodity.status,
                  }
                : undefined
            }
            formError={formError}
            formSuccess={formSuccess}
            submitLoading={submitLoading}
            onClose={() => {
              setFormOpen(false);
              setFormError(null);
              setFormSuccess(null);
              setEditingCommodity(null);
            }}
            onSubmit={handleSaveCommodity}
          />
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="font-h1-desktop text-h1-desktop text-on-surface">
                Commodity Management
              </h2>
              <p className="mt-1 font-body-lg text-on-surface-variant">
                Track and manage commodity listings, SRP updates, and compliance status.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setEditingCommodity(null);
                setFormOpen(true);
                setFormError(null);
                setFormSuccess(null);
              }}
              className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-on-primary shadow-sm transition-all hover:shadow-md"
            >
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
              </div>

              <div className="mb-4 rounded-2xl border border-outline-variant bg-surface-container-low p-4">
                <div className="relative w-full">
                  <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={20} />
                  <input
                    className="w-full rounded-xl border border-outline-variant bg-surface py-2.5 pl-10 pr-4 text-body-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="Filter by commodity name, category, or status..."
                    type="text"
                    value={searchTerm}
                    onChange={(event) => {
                      setSearchTerm(event.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="whitespace-nowrap text-body-sm font-semibold text-on-surface-variant">
                    Filter by status:
                  </span>
                  {(["ALL", "Active", "Inactive"] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setStatusFilter(option);
                        setCurrentPage(1);
                      }}
                      className={`rounded-full px-4 py-1.5 text-label-caps font-semibold transition-colors ${
                        statusFilter === option
                          ? "bg-primary-container text-on-primary-container"
                          : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
                      }`}
                    >
                      {option === "ALL" ? "All Status" : option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-left">
                  <thead>
                    <tr className="border-b border-outline-variant/30">
                      <th className="pb-4 text-[10px] font-semibold uppercase tracking-wide text-outline">Commodity</th>
                      <th className="pb-4 text-[10px] font-semibold uppercase tracking-wide text-outline">Category</th>
                      <th className="pb-4 text-[10px] font-semibold uppercase tracking-wide text-outline">Status</th>
                      <th className="pb-4 text-[10px] font-semibold uppercase tracking-wide text-outline">SRP (PHP)</th>
                      <th className="pb-4 text-right text-[10px] font-semibold uppercase tracking-wide text-outline">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/20">
                    {isLoading ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-sm text-on-surface-variant">
                          Loading commodities...
                        </td>
                      </tr>
                    ) : error ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-sm text-error">
                          {error}
                        </td>
                      </tr>
                    ) : filteredCommodityRows.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-sm text-on-surface-variant">
                          No commodities match the current filters.
                        </td>
                      </tr>
                    ) : (
                      paginatedCommodityRows.map((item) => {
                        const Icon = item.icon;
                        return (
                          <tr key={item.id}>
                            <td className="py-4">
                              <div className="flex items-center gap-3">
                                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${item.iconBg}`}>
                                  <Icon size={18} />
                                </div>
                                <span className="font-semibold text-on-surface">{item.name}</span>
                              </div>
                            </td>
                            <td className="py-4 text-sm text-on-surface-variant">{item.category}</td>
                            <td className="py-4">
                              <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${item.statusClass}`}>
                                <span className={`h-1.5 w-1.5 rounded-full ${item.status === "Active" ? "bg-primary animate-pulse" : "bg-outline"}`} />
                                {item.status}
                              </span>
                            </td>
                            <td className="py-4 text-sm font-semibold text-primary">{item.srp}</td>
                            <td className="py-4 text-right">
                              <button
                                className="rounded-lg p-2 text-on-surface-variant transition-colors hover:text-primary"
                                title="Edit commodity"
                                onClick={() =>
                                  handleEditCommodity({
                                    id: item.id,
                                    name: item.name,
                                    category: item.category,
                                    status: item.status,
                                  })
                                }
                              >
                                <MdEdit size={18} />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-col gap-3 border-t border-outline-variant bg-surface-container-low px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-body-sm text-on-surface-variant">
                  Showing {filteredCommodityRows.length === 0 ? 0 : `${startIndex}-${endIndex}`} of {filteredCommodityRows.length} commodities
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
          </section>
        </div>
      </section>
    </main>
  );
}
