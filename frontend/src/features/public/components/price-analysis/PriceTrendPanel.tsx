type PriceRange = "1M" | "6M" | "1Y";

type PriceInsight = {
  title: string;
  price: string;
  change: string;
  confidence: string;
  path: string;
  labels: string[];
};

type PriceTrendPanelProps = {
  activeInsight: PriceInsight;
  activeRange: PriceRange;
  rangeOptions: readonly PriceRange[];
  onRangeChange: (range: PriceRange) => void;
};

export function PriceTrendPanel({
  activeInsight,
  activeRange,
  rangeOptions,
  onRangeChange,
}: PriceTrendPanelProps) {
  return (
    <section className="rounded-3xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-outline">Price trend</p>
          <h3 className="mt-1 text-xl font-semibold text-on-surface">{activeInsight.title}</h3>
          <p className="mt-1 text-sm text-on-surface-variant">
            {activeInsight.change} • {activeInsight.confidence} confidence
          </p>
        </div>

        <div className="flex gap-2">
          {rangeOptions.map((range) => (
            <button
              key={range}
              className={`rounded-full px-3 py-1.5 text-sm font-semibold transition-all ${
                activeRange === range
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
              }`}
              onClick={() => onRangeChange(range)}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-outline-variant bg-surface-container p-4">
        <div className="relative h-70">
          <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
            {[0, 1, 2, 3, 4].map((line) => (
              <div key={line} className="w-full border-t border-surface-variant/80" />
            ))}
          </div>

          <svg className="h-full w-full" viewBox="0 0 1000 320" preserveAspectRatio="none">
            <path
              d="M 0,225 L 200,220 L 400,215 L 600,200 L 800,180 L 1000,170"
              fill="none"
              stroke="#8E97A8"
              strokeDasharray="8 6"
              strokeWidth="2"
            />
            <path
              d={activeInsight.path}
              fill="none"
              stroke="#004ac6"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
            />
            <circle cx="760" cy="180" r="6" fill="#004ac6" stroke="#ffffff" strokeWidth="2" />
          </svg>

          <div className="absolute left-[74%] top-4 z-10 rounded-2xl border border-outline-variant bg-surface-container-lowest p-3 shadow-sm">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-outline">Latest point</p>
            <p className="text-xl font-semibold text-on-surface">{activeInsight.price}</p>
            <p className="text-sm text-success">{activeInsight.change}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {activeInsight.labels.map((label) => (
            <span
              key={label}
              className="rounded-full bg-surface-container-high px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-on-surface-variant"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
