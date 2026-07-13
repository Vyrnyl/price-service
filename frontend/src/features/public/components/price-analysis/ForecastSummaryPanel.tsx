import { MdBolt, MdChevronRight, MdInfo } from "react-icons/md";

type PriceInsight = {
  projection: string;
};

type ForecastSummaryPanelProps = {
  activeInsight: PriceInsight;
  currentPrice: number | null;
  projectedPrice: number | null;
  confidence: number | null;
  onOpenDetail: () => void;
};

function formatCurrency(value: number | null | undefined) {
  if (value == null || Number.isNaN(value)) {
    return "—";
  }

  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 2,
  }).format(value);
}

function formatConfidence(value: number | null | undefined) {
  if (value == null || Number.isNaN(value)) {
    return "—";
  }

  return `${Math.round(value * 100)}%`;
}

export function ForecastSummaryPanel({
  activeInsight,
  currentPrice,
  projectedPrice,
  confidence,
  onOpenDetail,
}: ForecastSummaryPanelProps) {
  return (
    <section className="flex flex-col gap-6">
      <div className="rounded-3xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-primary/10 p-2 text-primary">
            <MdBolt size={20} />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[.24em] text-outline">Forecast outlook</p>
            <h3 className="mt-1 text-xl font-semibold text-on-surface">Next week snapshot</h3>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {[
            { label: "Current price", value: formatCurrency(currentPrice) },
            { label: "Projected", value: formatCurrency(projectedPrice) },
            { label: "Confidence", value: formatConfidence(confidence) },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between rounded-2xl bg-surface-container px-3 py-2.5">
              <span className="text-sm text-on-surface-variant">{item.label}</span>
              <span className="text-sm font-semibold text-on-surface">{item.value}</span>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-2xl border border-outline-variant bg-surface-container-high p-4">
          <p className="text-sm text-on-surface-variant">{activeInsight.projection}</p>
          <button
            type="button"
            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary"
            onClick={onOpenDetail}
          >
            View detailed report <MdChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="rounded-3xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <MdInfo className="text-primary" size={18} />
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-outline">Consumer note</p>
        </div>
        <p className="mt-3 text-sm leading-6 text-on-surface">
          This forecast supports awareness of likely movements, but market outcomes may vary because of logistics, weather, and local supply changes.
        </p>
      </div>
    </section>
  );
}
