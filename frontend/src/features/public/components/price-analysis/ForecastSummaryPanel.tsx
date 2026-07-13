import { MdBolt, MdChevronRight, MdInfo } from "react-icons/md";

type PriceInsight = {
  projection: string;
};

type ForecastSummaryPanelProps = {
  activeInsight: PriceInsight;
  onOpenDetail: () => void;
};

export function ForecastSummaryPanel({ activeInsight, onOpenDetail }: ForecastSummaryPanelProps) {
  return (
    <section className="flex flex-col gap-6">
      <div className="rounded-3xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-primary/10 p-2 text-primary">
            <MdBolt size={20} />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-outline">Forecast outlook</p>
            <h3 className="mt-1 text-xl font-semibold text-on-surface">Next month snapshot</h3>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {[
            { label: "Current price", value: "₱55.00" },
            { label: "Projected", value: "₱57.00" },
            { label: "Confidence", value: "95%" },
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
