import type { CommodityDetailsItem } from "../api/commodity.api";

type CommodityDetailsDialogProps = {
  open: boolean;
  commodity: CommodityDetailsItem | null;
  onClose: () => void;
  onOpenUpdateSrp: () => void;
};

export default function CommodityDetailsDialog({
  open,
  commodity,
  onClose,
  onOpenUpdateSrp,
}: CommodityDetailsDialogProps) {
  if (!open || !commodity) return null;

  const currentSrp = commodity.srps?.[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-3xl border border-outline-variant bg-surface-container-lowest p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)]">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-h3-desktop font-semibold text-on-surface">Commodity Details</h2>
            <p className="mt-2 text-body-sm text-on-surface-variant">
              View commodity overview and manage the latest Suggested Retail Price (SRP).
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

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-outline-variant bg-white p-5 shadow-sm">
            <p className="text-label-caps text-xs uppercase tracking-[0.24em] text-on-surface-variant">Name</p>
            <p className="mt-2 text-lg font-semibold text-on-surface">{commodity.name}</p>
          </div>
          <div className="rounded-3xl border border-outline-variant bg-white p-5 shadow-sm">
            <p className="text-label-caps text-xs uppercase tracking-[0.24em] text-on-surface-variant">Category</p>
            <p className="mt-2 text-lg font-semibold text-on-surface">{commodity.category}</p>
          </div>
          <div className="rounded-3xl border border-outline-variant bg-white p-5 shadow-sm">
            <p className="text-label-caps text-xs uppercase tracking-[0.24em] text-on-surface-variant">Status</p>
            <p className="mt-2 text-lg font-semibold text-on-surface">{commodity.status}</p>
          </div>
          <div className="rounded-3xl border border-outline-variant bg-white p-5 shadow-sm">
            <p className="text-label-caps text-xs uppercase tracking-[0.24em] text-on-surface-variant">Current SRP</p>
            <p className="mt-2 text-lg font-semibold text-primary">
              {currentSrp ? `₱${currentSrp.price}` : "No SRP recorded"}
            </p>
            {currentSrp ? (
              <p className="mt-1 text-sm text-on-surface-variant">
                Effective {new Date(currentSrp.effectiveDate).toLocaleDateString()}
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onOpenUpdateSrp}
            className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-on-primary transition hover:bg-primary-container"
          >
            Update SRP
          </button>
        </div>
      </div>
    </div>
  );
}
