"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { MdAdd } from "react-icons/md";
import { apiFetch } from "@/lib/api";
import PriceRecordForm from "@/features/officer/components/PriceRecordForm";
import PriceRecordFilters from "@/features/officer/components/PriceRecordFilters";
import PriceRecordsTable from "@/features/officer/components/PriceRecordsTable";
import type {
  CommodityOption,
  CreatePriceRecordPayload,
  PriceRecord,
  PriceStatusValue,
  StoreOption,
} from "@/features/officer/price-records.types";

const FILTERS = [
  { id: "all", label: "All Records" },
  { id: "above", label: "Above SRP" },
  { id: "compliant", label: "Compliant" },
];

const STATUS_OPTIONS = [
  { value: "COMPLIANT", label: "Compliant" },
  { value: "OVERPRICE", label: "Above SRP" },
  { value: "UNDERPRICE", label: "Below SRP" },
] as const;

function formatInputDateTime(value: string) {
  const date = new Date(value);
  const offset = date.getTimezoneOffset() * 60000;
  const localDate = new Date(date.getTime() - offset);
  return localDate.toISOString().slice(0, 16);
}

function createDefaultRecord(): CreatePriceRecordPayload {
  return {
    commodityId: "",
    storeId: "",
    price: 0,
    dateAndTime: new Date().toISOString().slice(0, 16),
    status: "COMPLIANT",
  };
}

function mapBackendPriceRecord(record: any): PriceRecord {
  const dateObject = new Date(record.dateAndTime);
  const date = dateObject.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const time = dateObject.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  const officerName = record.user?.name ?? "Officer";
  const officerInitials = officerName
    .split(" ")
    .map((part: string) => part[0] ?? "")
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const statusLabel =
    record.status === "COMPLIANT"
      ? "Compliant"
      : record.status === "OVERPRICE"
        ? "Above SRP"
        : "Below SRP";

  return {
    id: record.id,
    storeId: record.store?.id ?? "",
    commodityId: record.commodity?.id ?? "",
    date,
    time,
    dateAndTime: record.dateAndTime,
    store: record.store?.name ?? "Unknown store",
    location: record.store?.location ?? "",
    commodity: record.commodity?.name ?? "Unknown commodity",
    commodityDetails: record.commodity?.category ?? "",
    price: `₱${Number(record.price).toFixed(2)}`,
    status: statusLabel,
    statusValue: record.status,
    srp: record.srp ? `₱${Number(record.srp).toFixed(2)}` : undefined,
    officerInitials,
    officerName,
  };
}

export default function PriceRecordsPage({
  canCreateRecord = true,
}: {
  canCreateRecord?: boolean;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [storeFilter, setStoreFilter] = useState("");
  const [commodityFilter, setCommodityFilter] = useState("");
  const [stores, setStores] = useState<StoreOption[]>([]);
  const [commodities, setCommodities] = useState<CommodityOption[]>([]);
  const [records, setRecords] = useState<PriceRecord[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<PriceRecord | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof CreatePriceRecordPayload, string>>
  >({});
  const [submitLoading, setSubmitLoading] = useState(false);
  const [newRecord, setNewRecord] = useState<CreatePriceRecordPayload>(createDefaultRecord);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [storeResponse, commodityResponse, recordResponse] =
          await Promise.all([
            apiFetch<{ status: string; data: StoreOption[] }>("/api/stores"),
            apiFetch<{ status: string; data: CommodityOption[] }>(
              "/api/commodities",
            ),
            apiFetch<{ status: string; data: any[] }>("/api/price-records"),
          ]);

        setStores(storeResponse.data);
        setCommodities(commodityResponse.data);
        setRecords(recordResponse.data.map(mapBackendPriceRecord));
      } catch (error) {
        console.error("Unable to load price record data", error);
      }
    };

    void loadData();
  }, []);

  const filteredRecords = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return records.filter((record) => {
      const matchesFilter =
        activeFilter === "all" ||
        (activeFilter === "above" && record.status === "Above SRP") ||
        (activeFilter === "compliant" && record.status === "Compliant");

      const matchesSearch =
        query === "" ||
        record.store.toLowerCase().includes(query) ||
        record.commodity.toLowerCase().includes(query) ||
        record.officerName.toLowerCase().includes(query);

      const matchesStore = storeFilter === "" || record.storeId === storeFilter;
      const matchesCommodity =
        commodityFilter === "" || record.commodityId === commodityFilter;

      return matchesFilter && matchesSearch && matchesStore && matchesCommodity;
    });
  }, [activeFilter, commodityFilter, records, searchQuery, storeFilter]);

  const handleFieldChange = (
    field: keyof CreatePriceRecordPayload,
    value: string | number,
  ) => {
    setNewRecord((current) => ({ ...current, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setEditingRecord(null);
    setFormError(null);
    setFormErrors({});
    setNewRecord(createDefaultRecord());
  };

  const handleOpenCreateForm = () => {
    setEditingRecord(null);
    setFormError(null);
    setFormErrors({});
    setNewRecord(createDefaultRecord());
    setFormOpen(true);
  };

  const handleEditRecord = (record: PriceRecord) => {
    setEditingRecord(record);
    setFormError(null);
    setFormErrors({});
    setNewRecord({
      commodityId: record.commodityId,
      storeId: record.storeId,
      price: Number(record.price.replace(/[^\d.]/g, "")) || 0,
      dateAndTime: record.dateAndTime ? formatInputDateTime(record.dateAndTime) : "",
      status: (record.statusValue ?? "COMPLIANT") as CreatePriceRecordPayload["status"],
    });
    setFormOpen(true);
  };

  const handleSubmitRecord = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    const nextErrors: Partial<Record<keyof CreatePriceRecordPayload, string>> =
      {};

    if (!newRecord.storeId) {
      nextErrors.storeId = "Please select a store.";
    }
    if (!newRecord.commodityId) {
      nextErrors.commodityId = "Please select a commodity.";
    }
    if (!newRecord.dateAndTime) {
      nextErrors.dateAndTime = "Please choose a date and time.";
    }
    if (newRecord.price <= 0) {
      nextErrors.price = "Please enter a valid price.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setFormErrors(nextErrors);
      return;
    }

    try {
      setSubmitLoading(true);
      const payload = {
        ...newRecord,
        dateAndTime: new Date(newRecord.dateAndTime).toISOString(),
      };
      const response = await apiFetch<{ status: string; data: any }>(
        editingRecord ? `/api/price-records/${editingRecord.id}` : "/api/price-records",
        {
          method: editingRecord ? "PUT" : "POST",
          body: payload,
        },
      );

      if (editingRecord) {
        setRecords((current) =>
          current.map((record) =>
            record.id === editingRecord.id
              ? mapBackendPriceRecord(response.data)
              : record,
          ),
        );
      } else {
        setRecords((current) => [
          mapBackendPriceRecord(response.data),
          ...current,
        ]);
      }

      handleCloseForm();
    } catch (error: unknown) {
      setFormError(
        error instanceof Error ? error.message : "Unable to save price record.",
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <main className="min-h-screen lg:ml-72">
      <section className="px-container-margin-mobile py-12 md:px-container-margin-desktop">
        <div className="mx-auto max-w-7xl space-y-6">
          <header className="space-y-3">
            <span className="font-label-caps text-label-caps uppercase tracking-[0.24em] text-outline">
              Monitoring Logs
            </span>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="font-h2-desktop text-h2-desktop text-on-surface">
                  Price Records
                </h1>
                <p className="mt-1 text-body-sm text-on-surface-variant">
                  Showing {records.length} validated entries in the last 30
                  days.
                </p>
              </div>
              {canCreateRecord ? (
                <button
                  type="button"
                  onClick={handleOpenCreateForm}
                  className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-body-sm font-semibold text-on-primary shadow-sm transition-all hover:shadow-md"
                >
                  <MdAdd size={20} />
                  New Entry
                </button>
              ) : null}
            </div>
          </header>

          <div className="relative">
            <PriceRecordFilters
              search={searchQuery}
              storeFilter={storeFilter}
              commodityFilter={commodityFilter}
              onSearchChange={setSearchQuery}
              onStoreChange={setStoreFilter}
              onCommodityChange={setCommodityFilter}
              stores={stores}
              commodities={commodities}
            />
          </div>

          {formOpen ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
              <PriceRecordForm
                stores={stores}
                commodities={commodities}
                formError={formError}
                formErrors={formErrors}
                submitLoading={submitLoading}
                newRecord={newRecord}
                mode={editingRecord ? "edit" : "create"}
                onChange={handleFieldChange}
                onCancel={handleCloseForm}
                onSubmit={handleSubmitRecord}
              />
            </div>
          ) : null}

          <PriceRecordsTable records={filteredRecords} onEdit={handleEditRecord} />
        </div>
      </section>
    </main>
  );
}
