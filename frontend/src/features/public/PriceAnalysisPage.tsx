"use client";

import { useState } from "react";
import {
  MdAutoAwesome,
  MdBarChart,
  MdBolt,
  MdChevronRight,
  MdClose,
  MdInfo,
  MdKeyboardArrowDown,
  MdMonetizationOn,
  MdSchedule,
  MdSearch,
  MdTrendingUp,
  MdVerified,
} from "react-icons/md";

const rangeOptions = ["1M", "6M", "1Y"] as const;

type RangeKey = (typeof rangeOptions)[number];

const rangeInsightMap: Record<
  RangeKey,
  {
    title: string;
    price: string;
    change: string;
    confidence: string;
    projection: string;
    path: string;
    labels: string[];
  }
> = {
  "1M": {
    title: "Last 30 Days",
    price: "₱56.20",
    change: "+0.8% vs previous cycle",
    confidence: "High",
    projection: "Slight upward pressure from transport costs",
    path: "M 0,260 L 120,245 L 240,250 L 360,220 L 480,205 L 600,195 L 760,170 L 920,155 L 1000,140",
    labels: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"],
  },
  "6M": {
    title: "Last 6 Months",
    price: "₱55.00",
    change: "+3.2% vs the same period last year",
    confidence: "High",
    projection: "Seasonal demand is lifting rates gradually",
    path: "M 0,300 L 120,290 L 240,270 L 360,240 L 480,225 L 600,205 L 760,180 L 920,155 L 1000,140",
    labels: ["MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT"],
  },
  "1Y": {
    title: "Last 12 Months",
    price: "₱53.80",
    change: "+7.4% across the year",
    confidence: "Medium",
    projection: "Longer-term stability with seasonal spikes",
    path: "M 0,280 L 120,272 L 240,260 L 360,245 L 480,220 L 600,205 L 760,185 L 920,160 L 1000,140",
    labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG"],
  },
};

const summaryCards = [
  {
    title: "Current price",
    value: "₱55.00",
    detail: "As of today",
    icon: MdMonetizationOn,
    accent: "text-primary",
  },
  {
    title: "SRP benchmark",
    value: "₱54.00",
    detail: "Within policy range",
    icon: MdVerified,
    accent: "text-success",
  },
  {
    title: "Forecasted next month",
    value: "₱57.00",
    detail: "Projected increase",
    icon: MdTrendingUp,
    accent: "text-error",
  },
  {
    title: "Compliance status",
    value: "Compliant",
    detail: "Stable market watch",
    icon: MdBarChart,
    accent: "text-primary",
  },
];

const dailyChanges = [
  { label: "Today", value: "+₱1.00", note: "From yesterday's average" },
  { label: "This week", value: "+₱2.50", note: "Compared with last week" },
  { label: "30-day trend", value: "+₱3.20", note: "Across the latest month" },
];

const commodityOptions = [
  "Rice (Well-milled)",
  "Sugar (Refined)",
  "Pork (Liempo)",
  "Chicken (Whole)",
  "Cooking Oil",
  "Eggs",
  "Milk Powder",
  "Vermicelli",
];

export default function PriceAnalysisPage() {
  const [activeRange, setActiveRange] = useState<RangeKey>("6M");
  const [selectedCommodity, setSelectedCommodity] = useState(commodityOptions[0]);
  const [isCommodityOpen, setIsCommodityOpen] = useState(false);
  const [commoditySearch, setCommoditySearch] = useState("");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const activeInsight = rangeInsightMap[activeRange];

  const filteredCommodities = commodityOptions.filter((option) =>
    option.toLowerCase().includes(commoditySearch.trim().toLowerCase()),
  );

  return (
    <main className="min-h-screen bg-surface-container-low lg:ml-72">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-container-margin-mobile py-8 md:px-container-margin-desktop md:py-10">
        <div className="flex flex-col gap-4 rounded-3xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">
              <MdBarChart size={14} />
              Public price analysis
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-on-surface md:text-4xl">
              Price trends and forecasts
            </h2>
            <p className="mt-2 text-sm text-on-surface-variant md:text-base">
              Follow essential commodity movements, understand current compliance, and review the latest outlook for the market.
            </p>
          </div>

          <div className="relative w-full min-w-60 md:w-67.5">
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-2xl border border-outline-variant bg-surface-container-high px-3 py-2 text-left"
              onClick={() => {
                setIsCommodityOpen((value) => !value);
                setCommoditySearch("");
              }}
            >
              <span className="flex flex-col">
                <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-outline">
                  Commodity
                </span>
                <span className="text-sm font-semibold text-primary">{selectedCommodity}</span>
              </span>
              <MdKeyboardArrowDown className={`transition-transform ${isCommodityOpen ? "rotate-180" : ""}`} />
            </button>

            {isCommodityOpen ? (
              <div className="absolute left-0 top-full z-20 mt-2 w-full rounded-2xl border border-outline-variant bg-surface-container-lowest p-2 shadow-lg">
                <div className="relative mb-2">
                  <MdSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                  <input
                    type="text"
                    value={commoditySearch}
                    onChange={(event) => setCommoditySearch(event.target.value)}
                    placeholder="Search commodity"
                    className="w-full rounded-xl border border-outline-variant bg-surface-container-high py-2 pl-9 pr-3 text-sm outline-none focus:border-primary"
                  />
                </div>
                <div className="max-h-52 overflow-y-auto">
                  {filteredCommodities.length > 0 ? (
                    filteredCommodities.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className={`flex w-full items-center rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                          selectedCommodity === option
                            ? "bg-primary/10 text-primary"
                            : "text-on-surface hover:bg-surface-container-high"
                        }`}
                        onClick={() => {
                          setSelectedCommodity(option);
                          setIsCommodityOpen(false);
                          setCommoditySearch("");
                        }}
                      >
                        {option}
                      </button>
                    ))
                  ) : (
                    <p className="px-3 py-2 text-sm text-on-surface-variant">No commodities found.</p>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-4 shadow-sm"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-outline">
                    {card.title}
                  </span>
                  <div className={`rounded-xl bg-surface-container-high p-2 ${card.accent}`}>
                    <Icon size={18} />
                  </div>
                </div>
                <p className="text-2xl font-semibold text-on-surface">{card.value}</p>
                <p className="mt-1 text-sm text-on-surface-variant">{card.detail}</p>
              </div>
            );
          })}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.45fr_0.8fr]">
          <section className="rounded-3xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
            <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-outline">
                  Price trend
                </p>
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
                    onClick={() => setActiveRange(range)}
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
                  <span key={label} className="rounded-full bg-surface-container-high px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-on-surface-variant">
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-6">
            <div className="rounded-3xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="rounded-2xl bg-primary/10 p-2 text-primary">
                  <MdBolt size={20} />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-outline">
                    Forecast outlook
                  </p>
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
                  onClick={() => setShowDetailModal(true)}
                >
                  View detailed report <MdChevronRight size={18} />
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <MdInfo className="text-primary" size={18} />
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-outline">
                  Consumer note
                </p>
              </div>
              <p className="mt-3 text-sm leading-6 text-on-surface">
                This forecast supports awareness of likely movements, but market outcomes may vary because of logistics, weather, and local supply changes.
              </p>
            </div>
          </section>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="rounded-3xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-outline">
                  Daily price changes
                </p>
                <h3 className="mt-1 text-xl font-semibold text-on-surface">Recent movement in the commodity price</h3>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              {dailyChanges.map((change) => (
                <div key={change.label} className="rounded-2xl border border-outline-variant bg-surface-container-high p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-on-surface">{change.label}</span>
                    <span className="font-semibold text-primary">{change.value}</span>
                  </div>
                  <p className="mt-2 text-sm text-on-surface-variant">{change.note}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-outline">
              Forecast method
            </p>
            <div className="mt-4 rounded-2xl border border-outline-variant bg-surface-container-high p-4">
              <p className="text-sm font-semibold text-on-surface">ARIMA-based forecasting</p>
              <p className="mt-2 text-sm leading-7 text-on-surface-variant">
                Prices are projected using an ARIMA model that studies recent trends, seasonality, and short-term shifts to estimate the next likely movement.
              </p>
            </div>
            <div className="mt-4 space-y-3">
              {[
                { label: "Historical pattern", value: "Included" },
                { label: "Seasonal effects", value: "Included" },
                { label: "Short-term outlook", value: "Updated daily" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-2xl bg-surface-container px-3 py-2.5">
                  <span className="text-sm text-on-surface-variant">{item.label}</span>
                  <span className="text-sm font-semibold text-on-surface">{item.value}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>

      {showDetailModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
          <div className="w-full max-w-3xl rounded-3xl border border-outline-variant bg-surface-container-lowest p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-outline">
                  Detailed forecast report
                </p>
                <h3 className="mt-1 text-2xl font-semibold text-on-surface">
                  {selectedCommodity} forecast overview
                </h3>
                <p className="mt-2 text-sm text-on-surface-variant">
                  Insights for the selected commodity, including current price, expected movement, and the statistical basis behind the projection.
                </p>
              </div>
              <button
                type="button"
                className="rounded-full bg-surface-container-high p-2 text-on-surface-variant transition-colors hover:bg-surface-container-highest"
                onClick={() => setShowDetailModal(false)}
              >
                <MdClose size={20} />
              </button>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-outline-variant bg-surface-container-high p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-outline">Current price</p>
                <p className="mt-2 text-3xl font-semibold text-on-surface">₱55.00</p>
                <p className="mt-1 text-sm text-on-surface-variant">Compared with the SRP benchmark of ₱54.00</p>
              </div>
              <div className="rounded-2xl border border-outline-variant bg-surface-container-high p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-outline">Forecast window</p>
                <p className="mt-2 text-3xl font-semibold text-on-surface">+₱2.00</p>
                <p className="mt-1 text-sm text-on-surface-variant">Expected over the next month</p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-outline-variant bg-surface-container p-4">
              <p className="text-sm font-semibold text-on-surface">Why this forecast matters</p>
              <p className="mt-2 text-sm leading-7 text-on-surface-variant">
                The outlook is based on the latest price pattern, seasonality, and recent market volatility. The ARIMA model continues to update as new price points arrive, making this view useful for short-term monitoring and planning.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {[
                { label: "Confidence", value: "High" },
                { label: "Range", value: "₱53.00 - ₱57.00" },
                { label: "Model", value: "ARIMA" },
              ].map((item) => (
                <div key={item.label} className="rounded-full border border-outline-variant bg-surface-container-high px-3 py-2 text-sm">
                  <span className="text-on-surface-variant">{item.label}: </span>
                  <span className="font-semibold text-on-surface">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
