import type { PriceRecord } from "@/features/officer/price-records.types";

interface PriceRecordsTableProps {
  records: PriceRecord[];
  onView?: (recordId: string) => void;
}

function getStatusClasses(status: string) {
  if (status === "Compliant") {
    return "rounded-full bg-secondary-fixed text-on-secondary-fixed px-3 py-1 text-[12px] font-semibold";
  }

  if (status === "Above SRP") {
    return "rounded-full bg-error-container text-error px-3 py-1 text-[12px] font-semibold";
  }

  return "rounded-full bg-surface-container-highest text-on-surface-variant px-3 py-1 text-[12px] font-semibold";
}

export default function PriceRecordsTable({ records, onView }: PriceRecordsTableProps) {
  return (
    <div className="rounded-3xl border border-outline-variant bg-white p-5 data-card-shadow md:p-6">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-h3-desktop text-h3-desktop text-on-surface">Recent Price Records</h2>
          <p className="text-body-xs text-on-surface-variant">
            Review the latest submissions and compliance status.
          </p>
        </div>
        <span className="inline-flex items-center rounded-full bg-surface-container-low py-1.5 px-2.5 text-body-xs text-on-surface-variant">
          {records.length} records shown
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed text-left">
          <thead>
            <tr className="border-b border-outline-variant/30">
              <th className="pb-2 text-[9px] font-label-caps uppercase tracking-[0.24em] text-outline">Date & Time</th>
              <th className="pb-2 text-[9px] font-label-caps uppercase tracking-[0.24em] text-outline">Store & Location</th>
              <th className="pb-2 text-[9px] font-label-caps uppercase tracking-[0.24em] text-outline">Commodity</th>
              <th className="pb-2 text-[9px] font-label-caps uppercase tracking-[0.24em] text-outline">Price & Status</th>
              <th className="pb-2 text-[9px] font-label-caps uppercase tracking-[0.24em] text-outline">Officer</th>
              <th className="pb-2 text-right text-[9px] font-label-caps uppercase tracking-[0.24em] text-outline">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20">
            {records.map((record) => (
              <tr key={record.id}>
                <td className="py-3 align-top">
                  <div className="font-semibold text-on-surface text-sm">{record.date}</div>
                  <div className="text-body-xs text-on-surface-variant">{record.time}</div>
                </td>
                <td className="py-3 align-top">
                  <div className="font-semibold text-on-surface text-sm">{record.store}</div>
                  <div className="text-body-xs text-on-surface-variant">{record.location}</div>
                </td>
                <td className="py-3 align-top">
                  <div className="font-semibold text-on-surface text-sm">{record.commodity}</div>
                  <div className="text-body-xs text-on-surface-variant">{record.commodityDetails}</div>
                </td>
                <td className="py-3 align-top">
                  <div className="font-semibold text-on-surface text-sm">{record.price}</div>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <span className={getStatusClasses(record.status)}>{record.status}</span>
                    {record.srp ? (
                      <span className="text-body-xs text-on-surface-variant">({record.srp})</span>
                    ) : null}
                  </div>
                </td>
                <td className="py-3 align-top">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-fixed text-primary font-semibold text-sm">
                      {record.officerInitials}
                    </div>
                    <span className="text-body-xs text-on-surface">{record.officerName}</span>
                  </div>
                </td>
                <td className="py-3 text-right align-top">
                  <button
                    type="button"
                    onClick={() => onView?.(record.id)}
                    className="rounded-full border border-outline-variant bg-surface px-3 py-1.5 text-body-xs font-semibold text-primary transition hover:bg-surface-container-highest"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
