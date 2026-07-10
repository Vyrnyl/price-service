import type { PriceRecord } from "@/features/officer/price-records.types";
import PriceRecordsTable from "@/features/officer/components/PriceRecordsTable";

interface StorePriceRecordsModalProps {
  storeId: string | null;
  storeName?: string;
  records: PriceRecord[];
  loading: boolean;
  onClose: () => void;
}

export function StorePriceRecordsModal({ storeId, storeName, records, loading, onClose }: StorePriceRecordsModalProps) {
  if (!storeId) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-4xl rounded-3xl border border-outline-variant bg-surface-container-lowest p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)]">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-h3-desktop font-semibold text-on-surface">Store Price Records</h2>
            <p className="mt-1 text-body-sm text-on-surface-variant">
              {storeName ? `Showing price records for ${storeName}.` : "Showing price records for the selected store."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex rounded-full bg-surface px-3 py-2 text-on-surface transition hover:bg-surface-container-high"
          >
            Close
          </button>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-outline-variant bg-white p-4 text-body-sm text-on-surface-variant">
            Loading price records...
          </div>
        ) : records.length > 0 ? (
          <PriceRecordsTable records={records} hideActions hideOfficerColumn />
        ) : (
          <div className="rounded-2xl border border-dashed border-outline-variant bg-white p-4 text-body-sm text-on-surface-variant">
            No price records found for this store.
          </div>
        )}
      </div>
    </div>
  );
}
