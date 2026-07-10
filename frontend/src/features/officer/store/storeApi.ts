import type { StoreFormData } from "@/features/officer/types";
import { apiFetch } from "@/lib/api";
import type { Store } from "@/features/officer/types";
import type { PriceRecord } from "@/features/officer/price-records.types";

export interface BackendPriceRecord {
  id: string;
  dateAndTime?: string | null;
  createdAt?: string | null;
  price: number | string;
  srp?: number | string | null;
  status?: string;
  user?: {
    name?: string | null;
  };
  store?: {
    id?: string;
    name?: string | null;
    location?: string | null;
  };
  commodity?: {
    id?: string;
    name?: string | null;
    category?: string | null;
  };
}

const formatNumber = (value: number | string) => {
  const numericValue = Number(value);
  if (Number.isNaN(numericValue)) {
    return "₱0.00";
  }
  return `₱${numericValue.toFixed(2)}`;
};

export function mapBackendPriceRecord(record: BackendPriceRecord): PriceRecord {
  const dateObject = new Date(record.dateAndTime ?? record.createdAt ?? "");
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
    .map((part) => part[0] ?? "")
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

  const statusValue =
    record.status === "COMPLIANT" || record.status === "OVERPRICE" || record.status === "UNDERPRICE"
      ? record.status
      : undefined;

  return {
    id: record.id,
    storeId: record.store?.id ?? "",
    commodityId: record.commodity?.id ?? "",
    date,
    time,
    dateAndTime: record.dateAndTime ?? undefined,
    store: record.store?.name ?? "Unknown store",
    location: record.store?.location ?? "",
    commodity: record.commodity?.name ?? "Unknown commodity",
    commodityDetails: record.commodity?.category ?? "",
    price: formatNumber(record.price),
    status: statusLabel,
    statusValue,
    srp: record.srp ? formatNumber(record.srp) : undefined,
    officerInitials,
    officerName,
  };
}

export async function fetchStores() {
  return apiFetch<{ status: string; data: Store[] }>("/api/stores");
}

export async function fetchStorePriceRecords() {
  return apiFetch<{ status: string; data: BackendPriceRecord[] }>("/api/price-records");
}

export async function saveStore(formData: StoreFormData, storeId?: string) {
  const payload = {
    name: formData.name.trim(),
    location: formData.location.trim(),
    lastVisited: formData.lastVisited ? new Date(formData.lastVisited).toISOString() : null,
  };

  return apiFetch<{ status: string; data: Store }>(
    storeId ? `/api/stores/${storeId}` : "/api/stores",
    {
      method: storeId ? "PUT" : "POST",
      body: payload,
    },
  );
}
