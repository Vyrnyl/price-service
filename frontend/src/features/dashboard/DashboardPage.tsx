import {
  MdCheckCircle,
  MdInfoOutline,
  MdStorefront,
  MdTrendingUp,
  MdWarningAmber,
} from "react-icons/md";
import HeroSection from "./HeroSection";
import SummaryStats from "./SummaryStats";
import TopCommoditiesGrid from "./TopCommoditiesGrid";

const recentTopCommodities = [
  {
    name: "Well-milled Rice",
    price: "₱45.00",
    updated: "Updated 2 min ago",
    status: "Compliant",
    icon: MdCheckCircle,
    statusClass: "bg-[#E8F5E9] text-[#2E7D32]",
  },
  {
    name: "Refined Sugar",
    price: "₱95.00",
    updated: "Updated 8 min ago",
    status: "Needs review",
    icon: MdWarningAmber,
    statusClass: "bg-error-container text-error",
  },
  {
    name: "Canned Sardines",
    price: "₱22.50",
    updated: "Updated 12 min ago",
    status: "Stable",
    icon: MdInfoOutline,
    statusClass: "bg-surface-container-highest text-on-surface-variant",
  },
];

const forecastHighlights = [
  {
    title: "Highest demand item",
    value: "Rice",
    note: "Most frequently checked commodity this week",
  },
  {
    title: "Most active area",
    value: "Virac",
    note: "Highest number of recent updates",
  },
  {
    title: "Best value spot",
    value: "Public Market",
    note: "Lowest average observed price this week",
  },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen lg:ml-72">
      <HeroSection />
      <SummaryStats />

      <section className="px-container-margin-mobile py-12 md:px-container-margin-desktop">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="rounded-3xl border border-outline-variant bg-white p-6 shadow-sm data-card-shadow">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="font-h3-desktop text-h3-desktop text-on-surface">
                  Top commodities recent list
                </h3>
                <p className="mt-1 font-body-sm text-on-surface-variant">
                  A quick look at the most recently updated commodities and their current market position.
                </p>
              </div>
              <button
                type="button"
                className="rounded-full border border-outline-variant px-4 py-2 font-label-caps text-label-caps text-on-surface-variant"
              >
                View more
              </button>
            </div>

            <div className="space-y-3">
              {recentTopCommodities.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.name}
                    className="flex items-center justify-between rounded-2xl border border-outline-variant bg-surface-container-low p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-surface-container-high p-2">
                        <Icon className="text-primary" size={20} />
                      </div>
                      <div>
                        <p className="font-body-sm font-semibold text-on-surface">
                          {item.name}
                        </p>
                        <p className="text-sm text-on-surface-variant">{item.updated}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-h3-desktop text-h3-desktop text-on-surface">
                        {item.price}
                      </p>
                      <span className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold ${item.statusClass}`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-outline-variant bg-surface-container-low p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <MdTrendingUp className="text-primary" size={22} />
                <h3 className="font-h3-desktop text-h3-desktop text-on-surface">
                  Market highlights
                </h3>
              </div>
              <div className="space-y-3">
                {forecastHighlights.map((item) => (
                  <div key={item.title} className="rounded-2xl bg-white p-4">
                    <p className="font-label-caps text-label-caps text-on-surface-variant">
                      {item.title}
                    </p>
                    <p className="mt-1 font-h3-desktop text-h3-desktop text-on-surface">
                      {item.value}
                    </p>
                    <p className="mt-1 text-sm text-on-surface-variant">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-outline-variant bg-primary-container/20 p-6 shadow-sm">
              <div className="mb-3 flex items-center gap-2">
                <MdStorefront className="text-primary" size={22} />
                <h3 className="font-h3-desktop text-h3-desktop text-on-surface">
                  Helpful for shoppers
                </h3>
              </div>
              <p className="font-body-sm text-on-surface-variant">
                Compare nearby stores, review recent price updates, and quickly see whether a commodity is aligned with the current SRP guidance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
